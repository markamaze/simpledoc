package simpledoc.services.agency;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Set;
import simpledoc.exceptions.ServiceErrorException;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import simpledoc.services.ModuleObject;

public class StructuralNode extends ModuleObject {

	private String structuralNode_label;
	private UUID structuralNode_parent_id;
	private Set<String> agent_assignments;
	private Set<UUID> structuralNode_dataTag_ids;
	

	StructuralNode(UUID id, String type) { super(id, type); }
	StructuralNode(UUID structuralNode_id, String type, Map<String, Object> data) throws ServiceErrorException {
		super(structuralNode_id, type);
		setLabel(data.get("structuralNode_label").toString());
		setParentId(data.get("structuralNode_parent_id"));
		setAgentAssignments(data.get("agent_assignments"));
		setDataTags(data.get("structuralNode_dataTag_ids"));
	}

	
	private void setLabel(String label) throws ServiceErrorException {
		if(AgencyValidator.validateString(label, 1, 48, true, true))
			this.structuralNode_label = label;
		else throw new ServiceErrorException("invalid label");
	}
	private void setParentId(Object object) throws ServiceErrorException {
		String id = object.toString();
		if(AgencyValidator.validateUUIDString(id)) 
			this.structuralNode_parent_id = UUID.fromString(id);
		else throw new ServiceErrorException("invalid id for required property: ParentId");
	}
	private void setAgentAssignments(Object assgndata) throws ServiceErrorException {
		
		//TODO: finish working this out
		
		Set<String> assignments = new HashSet<String>();
		
		if(assgndata instanceof ArrayList) {

			for(Object assgn : (ArrayList<?>)assgndata) {
				//check that each assignment is valid
				// if valid add to assignments set
				// if not valid throw exception
				System.out.println(assgn);
			}
			this.agent_assignments = assignments;
		}
		else throw new ServiceErrorException("invalid agent assignment list");
		

	}
	private void setDataTags(Object tagdata) throws ServiceErrorException {
		List<UUID> tags = new ArrayList<UUID>();
		
		if(tagdata instanceof ArrayList) {
			for(Object id : (ArrayList<?>)tagdata) {
				if(AgencyValidator.validateUUIDString(id.toString())) 
					tags.add(UUID.fromString(id.toString()));
				else throw new ServiceErrorException("invalid id in dataTag list");
			}
			this.structuralNode_dataTag_ids = new HashSet<UUID>(tags);
		}
		else throw new ServiceErrorException("invalid dataTag list format");
	}
	
	public String getLabel() { return this.structuralNode_label; }
	public UUID getParentId() { return this.structuralNode_parent_id; }
	public Set<String> getAgentAssignments() { return this.agent_assignments; }
	public Set<UUID> getDataTagIds() { return this.structuralNode_dataTag_ids; }

	
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
			}
		}
		return true;
	}
	
	
	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException, SQLException {
		setLabel(rs.getString("structuralNode_label"));
		setParentId(rs.getObject("structuralNode_parent_id"));
		setAgentAssignments(rs.getArray("agent_assignements"));
		setDataTags(rs.getArray("structuralNode_dataTag_ids"));

		return true;
	}
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
		PreparedStatement statement = null;
		try {
			switch(type) {
			case "create":
				statement = connection.prepareStatement("call agency.create_structuralNode(?,?,?,?,?)");
				break;
			case "update":
				statement = connection.prepareStatement("call agency.update_structuralnode(?,?,?,?,?)");
				break;
			}
			
			statement.setObject(1, this.getId());
			statement.setString(2, this.getLabel());
			statement.setObject(3, this.getParentId());
			statement.setObject(4, connection.createArrayOf("", this.getAgentAssignments().toArray()));
			statement.setArray(5, connection.createArrayOf("UUID", this.getDataTagIds().toArray()));
		} catch(SQLException err) { throw new ServiceErrorException("could not create storage statement"); }
		
		
		return null;
	}


	@Override
	public String writeToJson() {
		String assignments_json = "";
		//TODO: write json string for agent assignements
		
		
		String tag_json = "";
		for(UUID id : this.structuralNode_dataTag_ids) {
			tag_json += "\"" + id.toString() + "\",";
		}
		tag_json = tag_json.substring(0, tag_json.length()-1);
		
		String result = "{" +
				"\"id\":\"" + this.getId().toString() + "\"," +
				"\"type\":\"" + this.getModuleObjectType() + "\"," +
				"\"structuralNode_label\":\"" + this.getLabel() + "\"," +
				"\"structuralNode_parent_id\":\"" + this.getParentId().toString() + "\"," +
				"\"agent_assignments\":\"" + "[" + assignments_json + "]" +
				"\"structuralNode_dataTag_ids\":" + "[" + tag_json + "]" +					
				"}";

		return result;
	}

}
