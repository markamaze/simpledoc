package simpledoc.services.agency;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Set;
import simpledoc.exceptions.ServiceErrorException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.json.JSONArray;
import org.json.JSONObject;
import org.postgresql.util.PGobject;

import java.util.UUID;

import simpledoc.services.ModuleObject;

public class StructuralNode extends ModuleObject {

	private String structuralNode_label;
	private UUID structuralNode_parent_id;
	private List<Object> agent_assignments;
	private Set<UUID> structuralNode_dataTag_ids;
	private List<Object> structuralNode_properties;
	

	StructuralNode(UUID id, String type) { super(id, type); }
	StructuralNode(UUID structuralNode_id, String type, Map<String, Object> data) throws ServiceErrorException {
		super(structuralNode_id, type);
		setLabel(data.get("structuralNode_label").toString());
		setParentId(data.get("structuralNode_parent_id"));
		setAgentAssignments(data.get("agent_assignments"));
		setDataTags(data.get("structuralNode_dataTag_ids"));
		setProperties(data.get("structuralNode_properties"));
	}

	private void setProperties(Object object) throws ServiceErrorException {
		if(object instanceof PGobject) this.structuralNode_properties = new JSONArray(((PGobject)object).getValue()).toList();
		else if(object instanceof String) this.structuralNode_properties = new JSONArray(object).toList();
		else if(object instanceof List) this.structuralNode_properties = (List<Object>) object;
		else if(object == null) this.structuralNode_properties = new ArrayList<Object>();
		else throw new ServiceErrorException("invalid format for structuralNode properties");
	}
	
	private void setLabel(String label) throws ServiceErrorException {
		if(AgencyValidator.validateString(label, 1, 48, true, true))
			this.structuralNode_label = label;
		else throw new ServiceErrorException("invalid label");
	}
	private void setParentId(Object object) throws ServiceErrorException {
		String id = object.toString();
		if(id.equalsIgnoreCase("root")) 
			this.structuralNode_parent_id = this.getId();
		else if(AgencyValidator.validateUUIDString(id)) 
			this.structuralNode_parent_id = UUID.fromString(id);
		else throw new ServiceErrorException("invalid id for required property: ParentId");
	}
	private void setAgentAssignments(Object assgndata) throws ServiceErrorException {
		List<Object> assignments = new ArrayList<Object>();
		
		if(assgndata instanceof ArrayList) this.agent_assignments = (List<Object>) assgndata;
		else if(assgndata instanceof String) System.out.println("setAgentAssignments arg is a string");
		else if( assgndata == null) this.agent_assignments = assignments;
		else if(assgndata instanceof PGobject) this.agent_assignments = new JSONArray(((PGobject)assgndata).getValue()).toList();
		else throw new ServiceErrorException("invalid agent assignment list");
		

	}
	private void setDataTags(Object tagdata) throws ServiceErrorException {
		List<UUID> tags = new ArrayList<UUID>();
		
		if(tagdata instanceof UUID[]) {
			tags = Arrays.asList((UUID[])tagdata);
			this.structuralNode_dataTag_ids = new HashSet<UUID>(tags);
		}
		else if(tagdata instanceof ArrayList) {
			for(Object id : (ArrayList<?>)tagdata) {
				if(AgencyValidator.validateUUIDString(id.toString())) 
					tags.add(UUID.fromString(id.toString()));
				else throw new ServiceErrorException("invalid id in dataTag list");
			}
			this.structuralNode_dataTag_ids = new HashSet<UUID>(tags);
		}
		else if(tagdata == null) { this.structuralNode_dataTag_ids = new HashSet<UUID>(tags);}
		else throw new ServiceErrorException("invalid dataTag list format");
	}
	
	public String getLabel() { return this.structuralNode_label; }
	public UUID getParentId() { return this.structuralNode_parent_id; }
	public List<Object> getAgentAssignments() { return this.agent_assignments; }
	public Set<UUID> getDataTagIds() { return this.structuralNode_dataTag_ids; }
	public List<Object> getProperties() { return this.structuralNode_properties; }

	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			switch(entry.getKey()) {
				case "structuralNode_label":
					setLabel(entry.getValue().toString());
					break;
				case "structuralNode_parent_id":
					setParentId(entry.getValue());
					break;
				case "agent_assignments":
					setAgentAssignments(entry.getValue());
					break;
				case "structuralNode_dataTag_ids":
					setDataTags(entry.getValue());
					break;
				case "structuralNode_properties":
					setProperties(entry.getValue());
			}
		}
		return true;
	}
	
	
	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException, SQLException {
		setLabel(rs.getString("structuralNode_label"));
		setParentId(rs.getObject("structuralNode_parent_id"));
		setAgentAssignments(rs.getObject("agent_assignments"));
		setDataTags(rs.getArray("structuralNode_dataTag_ids").getArray());
		setProperties(rs.getObject("structuralNode_properties"));
		return true;
	}
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
		PreparedStatement statement = null;
		try {
			switch(type) {
			case "create":
				statement = connection.prepareStatement("call agency.create_structuralNode(?,?,?,?,?,?)");
				break;
			case "update":
				statement = connection.prepareStatement("call agency.update_structuralnode(?,?,?,?,?,?)");
				break;
			}
			
			PGobject propertiesPG = new PGobject();
			JSONArray arr = new JSONArray(this.getProperties());
			propertiesPG.setType("json");
			propertiesPG.setValue(arr.toString());
			
			PGobject assignmentsPG = new PGobject();
			JSONArray asgnArr = new JSONArray(this.getAgentAssignments());
			assignmentsPG.setType("json");
			assignmentsPG.setValue(asgnArr.toString());
			
			statement.setObject(1, this.getId());
			statement.setString(2, this.getLabel());
			statement.setObject(3, this.getParentId());
			statement.setObject(4, assignmentsPG);
			statement.setArray(5, connection.createArrayOf("UUID", this.getDataTagIds().toArray()));
			statement.setObject(6, propertiesPG);
		} catch(SQLException err) { throw new ServiceErrorException("could not create storage statement" + err.getMessage()); }
		
		
		return statement;
	}


	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("structuralNode_label", this.getLabel());
		json_result.put("structuralNode_parent_id", this.getParentId());
		json_result.put("agent_assignments", this.getAgentAssignments());
		json_result.put("structuralNode_dataTag_ids", this.getDataTagIds());
		json_result.put("structuralNode_properties", this.getProperties());
		
		return json_result.toString();
	}

}
