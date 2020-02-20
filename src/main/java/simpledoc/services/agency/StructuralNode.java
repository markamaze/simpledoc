package simpledoc.services.agency;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Set;
import simpledoc.exceptions.ServiceErrorException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.json.JSONObject;
import org.postgresql.util.PGobject;

import java.util.UUID;

import simpledoc.services.ModuleObject;

public class StructuralNode extends ModuleObject {

	private String structuralNode_label;
	private UUID structuralNode_parent_id;
	private Set<UUID> structuralNode_dataTag_ids;
	private Map<UUID, String> property_values;
	private Map<UUID, Object> active_assignments;
	

	StructuralNode(String id, String type) { super(id, type); }
	StructuralNode(String string, String type, Map<String, Object> data) throws ServiceErrorException {
		super(string, type);
		setStructuralNodeLabel(data.get("structuralNode_label"));
		setParentId(data.get("structuralNode_parent_id"));
		setDataTagIds(data.get("structuralNode_dataTag_ids"));
		setPropertyValues(data.get("property_values"));
		setActiveAssignments(data.get("active_assignments"));
	}

	
	private void setStructuralNodeLabel(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateString(object, 1, 48, true, true))
			this.structuralNode_label = object.toString();
		else throw new ServiceErrorException("invalid label");
	}
	private void setParentId(Object object) throws ServiceErrorException {
		UUID id = AgencyValidator.validateUUIDString(object);
		if(id != null) this.structuralNode_parent_id = id;
		else throw new ServiceErrorException("invalid id set for StructuralNode.structuralNode_parent_id");
	}
	private void setDataTagIds(Object object) throws ServiceErrorException {
		List<UUID> tags = new ArrayList<UUID>();
		
		if(object instanceof UUID[]) {
			tags = Arrays.asList((UUID[])object);
			this.structuralNode_dataTag_ids = new HashSet<UUID>(tags);
		}
		else if(object instanceof ArrayList) {
			for(Object id : (ArrayList<?>)object) {
				UUID validId = AgencyValidator.validateUUIDString(id);
				if(validId != null)	tags.add(validId);
				else throw new ServiceErrorException("invalid id in dataTag list");
			}
			this.structuralNode_dataTag_ids = new HashSet<UUID>(tags);
		}
		else if(object == null) { this.structuralNode_dataTag_ids = new HashSet<UUID>(tags);}
		else throw new ServiceErrorException("invalid dataTag list format");
	}
	private void setPropertyValues(Object object) throws ServiceErrorException {
		if(object instanceof Map) this.property_values = (Map<UUID, String>) object;
		else if(object instanceof PGobject) {
			JSONObject asJson = new JSONObject(((PGobject)object).getValue());
			Map<UUID, String> propertyValues = new HashMap<UUID, String>();
			for(String id : asJson.keySet()) { 
				UUID uuid = AgencyValidator.validateUUIDString(id);
				if(uuid != null) propertyValues.put(uuid, asJson.get(id).toString());
				else throw new ServiceErrorException("invalid uuid found in StructuralNode.property_values");
			};
			this.property_values = propertyValues;
		}
	}
	private void setActiveAssignments(Object object) throws ServiceErrorException {
		Map<UUID, Object> assignments = new HashMap<UUID, Object>();

		if(object instanceof PGobject) {
			JSONObject asJson = new JSONObject(((PGobject)object).getValue());
			for(String id : asJson.keySet()) {
				UUID uuid = AgencyValidator.validateUUIDString(id);
				if(uuid != null) assignments.put(uuid, asJson.get(id));
				else throw new ServiceErrorException("invalid uuid found in StructuralNode.active_assignments");
			}
			this.active_assignments = assignments;
		}
		
		else if(object instanceof Map) {
			
		
			((Map<?,?>)object).forEach((key, value) -> {
				assignments.put(UUID.fromString(key.toString()), value);
				
				//				UUID assignmentId = null;
//				Map<String, Object> assignment_data = new HashMap<String, Object>();
//				
//				if(key instanceof UUID) assignmentId = (UUID)object;
//				else if(key instanceof String)assignmentId = UUID.fromString(key.toString());
//				
//				if(value instanceof Map) {
//					((Map<?,?>)value).forEach((k, v) -> {
//						if(k.equals("active_agents")) {
//							if(v instanceof ArrayList) {
//								((ArrayList<?>)v).forEach(item ->{
//									if(AgencyValidator.validateUUIDString(item)) ;
//								});
//							}
//						}
//					});
//				}
			
			});
			this.active_assignments = assignments;
		}
	}
	

	public String getStructuralNodeLabel() { return this.structuralNode_label; }
	public UUID getParentId() { return this.structuralNode_parent_id; }
	public Set<UUID> getDataTagIds() { return this.structuralNode_dataTag_ids; }
	public Map<UUID, String> getPropertyValues() { return this.property_values; }
	public Map<UUID, Object> getActiveAssignments() { return this.active_assignments; }

	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			if(key.equals("structuralNode_label")) setStructuralNodeLabel(value);
			else if(key.equals("structuralNode_parent_id")) setParentId(value);
			else if(key.equals("structuralNode_dataTag_ids")) setDataTagIds(value);
			else if(key.equals("property_values")) setPropertyValues(value);
			else if(key.equals("active_assignments")) setActiveAssignments(value);
		}
		return true;
	}
	
	
	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException, SQLException {
		setStructuralNodeLabel(rs.getString("structuralNode_label"));
		setParentId(rs.getObject("structuralNode_parent_id"));
		setDataTagIds(rs.getArray("structuralNode_dataTag_ids").getArray());
		setPropertyValues(rs.getObject("property_values"));
		setActiveAssignments(rs.getObject("active_assignments"));
		return true;
	}
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException, SQLException {
		PreparedStatement statement = null;
		
		if(type.equals("create")) statement = connection.prepareStatement("call agency.create_structuralNode(?,?,?,?,?,?)");
		else if(type.equals("update")) statement = connection.prepareStatement("call agency.update_structuralnode(?,?,?,?,?,?)");
			
		PGobject propertiesPG = new PGobject();
		JSONObject jsonPropertyValues = new JSONObject(this.getPropertyValues());
		propertiesPG.setType("json");
		propertiesPG.setValue(jsonPropertyValues.toString());
			
		PGobject assignmentsPG = new PGobject();
		JSONObject jsonAssignments = new JSONObject(this.getActiveAssignments());
		assignmentsPG.setType("json");
		assignmentsPG.setValue(jsonAssignments.toString());
			
		UUID uuid;
		if(this.getId().startsWith("n-")) uuid = AgencyValidator.validateUUIDString(this.getId().substring(2));
		else uuid = AgencyValidator.validateUUIDString(this.getId());
		
		statement.setObject(1, uuid);
		statement.setString(2, this.getStructuralNodeLabel());
		statement.setObject(3, this.getParentId());
		statement.setArray(4, connection.createArrayOf("UUID", this.getDataTagIds().toArray()));
		statement.setObject(5, propertiesPG);
		statement.setObject(6, assignmentsPG);
	
		return statement;
	}


	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("structuralNode_label", this.getStructuralNodeLabel());
		json_result.put("structuralNode_parent_id", this.getParentId());
		json_result.put("structuralNode_dataTag_ids", this.getDataTagIds());
		json_result.put("property_values", this.getPropertyValues());
		json_result.put("active_assignments", this.getActiveAssignments());
		
		return json_result.toString();
	}

}
