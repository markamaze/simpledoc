package simpledoc.services.agency;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;
import org.postgresql.jdbc.PgArray;
import org.postgresql.util.PGobject;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;

public class Node extends ModuleObject {

	private String label;
	private UUID parent_id;
	private Set<UUID> tag_ids;
	private Set<String> property_values;
	private Set<Map<String,Object>> assignments;
	

	Node(String id, String type) { super(id, type); }
	Node(String string, String type, Map<String, Object> data) throws ServiceErrorException {
		super(string, type);
		setNodeLabel(data.get("label"));
		setParentId(data.get("parent_id"));
		setTagIds(data.get("tag_ids"));
		setPropertyValues(data.get("property_values"));
		setAssignments(data.get("assignments"));
	}

	
	private void setNodeLabel(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateString(object, 1, 48, true, true))
			this.label = object.toString();
		else throw new ServiceErrorException("invalid label");
	}
	private void setParentId(Object object) throws ServiceErrorException {
		UUID id = AgencyValidator.validateUUIDString(object);
		if(id != null) this.parent_id = id;
		else throw new ServiceErrorException("invalid id set for Node.parent_id");
	}
	private void setTagIds(Object object) throws ServiceErrorException {
		Set<UUID> tagIds = new HashSet<UUID>();
		
		if(object == null) this.tag_ids = tagIds;
		else if(object instanceof UUID[]) {
			for(Object tagId : (UUID[])object) {
				UUID id = AgencyValidator.validateUUIDString(tagId);
				if(id == null) throw new ServiceErrorException("invalid id in property: Agency.Node.tag_ids");
				else tagIds.add(id);
			}
			this.tag_ids = tagIds;
		}		
		else if(object instanceof ArrayList) {
			for(Object tagId : (ArrayList<?>) object) {
				UUID id = AgencyValidator.validateUUIDString(tagId);
				if(id == null) throw new ServiceErrorException("invalid id in tag list");
				else tagIds.add(id);
			}
			this.tag_ids = tagIds;
		}
		else throw new ServiceErrorException("invalid property Agency.Node.tag_ids");
	}
	private void setPropertyValues(Object object) throws ServiceErrorException {
		Set<String> propertyValues = new HashSet<String>();

		if(object instanceof ArrayList){
			for(Object item: (ArrayList<?>)object){
				if(!(item instanceof String)) throw new ServiceErrorException("");
				else if( ((String)item).split("=").length != 2 ) throw new ServiceErrorException("");
				else propertyValues.add(item.toString());
			}
			this.property_values = propertyValues;
		}
		else if(object instanceof String[]){
			for(String item : (String[])object){
				if(item.split("=").length != 2) throw new ServiceErrorException("");
				else propertyValues.add(item);
			}
			this.property_values = propertyValues;
		}
		else throw new ServiceErrorException("invalid property: Agency.Node.property_values");

	}
	private void setAssignments(Object object) throws ServiceErrorException {
		Set<Map<String, Object>> assignments = new HashSet<Map<String, Object>>();

		if(object instanceof PgArray) {
			JSONArray asJson = new JSONArray(((PgArray)object));
			for(Object item : asJson.toList()) {
				if(item instanceof JSONObject) assignments.add(((JSONObject)item).toMap());
				else throw new ServiceErrorException("invalid valid found in Node.assignments");
					
			}
			this.assignments = assignments;
		}
		
		else if(object instanceof ArrayList) {
			for(Object pair : (ArrayList<?>)object) {
				if(pair instanceof ArrayList && ((ArrayList<?>)pair).size() == 2) {
					UUID assignmentId = AgencyValidator.validateUUIDString(((ArrayList<?>)pair).get(0));
					UUID agentId = AgencyValidator.validateUUIDString(((ArrayList<?>)pair).get(1));		
					
					// if(assignmentId == null) throw new ServiceErrorException("invalid UUID found in Node.assignments");
					// else if(agentId == null) assignments.add(Map.entry(assignmentId, new UUID(0,0)));
					// else assignments.add(Map.entry(assignmentId, agentId));
				}
				
			}

			this.assignments = assignments;
		}
	}
	

	public String getNodeLabel() { return this.label; }
	public UUID getParentId() { return this.parent_id; }
	public Set<UUID> getTagIds() { return this.tag_ids; }
	public Set<String> getPropertyValues() {
		return this.property_values;
	}
	public Set<Map<String, Object>> getAssignments() {
		return this.assignments;
	}

	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			if(key.equals("label")) setNodeLabel(value);
			else if(key.equals("parent_id")) setParentId(value);
			else if(key.equals("tag_ids")) setTagIds(value);
			else if(key.equals("property_values")) setPropertyValues(value);
			else if(key.equals("assignments")) setAssignments(value);
		}
		return true;
	}
	
	
	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException, SQLException {
		setNodeLabel(rs.getString("label"));
		setParentId(rs.getObject("parent_id"));
		setTagIds(rs.getArray("tag_ids"));
		setPropertyValues(rs.getArray("property_values"));
		setAssignments(rs.getArray("assignments"));
		return true;
	}
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException, SQLException {
		PreparedStatement statement = null;
		
		if(type.equals("create")) statement = connection.prepareStatement("call agency.create_Node(?,?,?,?,?,?)");
		else if(type.equals("update")) statement = connection.prepareStatement("call agency.update_Node(?,?,?,?,?,?)");
			
		// PGobject propertiesPG = new PGobject();
		// JSONObject jsonPropertyValues = new JSONObject(this.getPropertyValues());
		// propertiesPG.setType("json");
		// propertiesPG.setValue(jsonPropertyValues.toString());
			
		// PGobject assignmentsPG = new PGobject();
		// JSONArray jsonAssignments = new JSONArray(this.getAssignments());
		
		// assignmentsPG.setType("json");
		// assignmentsPG.setValue(jsonAssignments.toString());
			
		UUID uuid = AgencyValidator.validateUUIDString(this.getId());
		
		statement.setObject(1, uuid);
		statement.setString(2, this.getNodeLabel());
		statement.setObject(3, this.getParentId());
		statement.setArray(4, connection.createArrayOf("UUID", this.getTagIds().toArray()));
		statement.setArray(5, connection.createArrayOf("TEXT", this.getPropertyValues().toArray()));
		statement.setArray(6, connection.createArrayOf("JSON", this.getAssignments().toArray()));
	
		return statement;
	}


	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("label", this.getNodeLabel());
		json_result.put("parent_id", this.getParentId());
		json_result.put("tag_ids", this.getTagIds());
		json_result.put("property_values", this.getPropertyValues());
		json_result.put("assignments", this.getAssignments());
		
		return json_result.toString();
	}

}
