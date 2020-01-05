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

import org.json.JSONObject;

import java.util.UUID;
import simpledoc.services.ModuleObject;

public class Agent extends ModuleObject {

	UUID structuralNode_link_id;
	UUID agentTemplate_id;
	UUID assigned_user_id;
	Boolean agent_is_active;
	Set<UUID> agent_dataTag_ids;
	
	Agent(UUID id, String type) { super(id, type); }
	Agent(UUID agent_id, String type, Map<String, Object> data) throws ServiceErrorException {
		super(agent_id, type);
		setStructuralNodeLinkId(data.get("structuralNode_link_id"));
		setAgentTemplateId(data.get("agentTemplate_id"));
		setAssignedUserId(data.get("assigned_user_id"));
		setAgentIsActive(data.get("agent_is_active"));
		setAgentDataTagIds(data.get("agent_dataTag_ids"));
	}


	private void setAgentIsActive(Object object) throws ServiceErrorException {
		if(object instanceof Boolean) {
			this.agent_is_active = (Boolean)object;
		} else throw new ServiceErrorException("invalid value for agentIsActive");
	}
	private void setAgentDataTagIds(Object object) throws ServiceErrorException {
		List<UUID> tagsList = new ArrayList<UUID>();
		if(object instanceof UUID[]) {
			tagsList = Arrays.asList((UUID[]) object);
			this.agent_dataTag_ids = new HashSet<UUID>(tagsList);
		}
		
		else if(object instanceof ArrayList) {
			for(Object id : (ArrayList<?>) object) {
				if(AgencyValidator.validateUUIDString(id.toString()))
					tagsList.add(UUID.fromString(id.toString()));
				else throw new ServiceErrorException("invalid Id in dataTag list");
			}
			this.agent_dataTag_ids = new HashSet<UUID>(tagsList);
		}
		else throw new ServiceErrorException("invalid dataTag list format");

	}
	private void setAssignedUserId(Object object) throws ServiceErrorException {
		String assignedUserIdString = object.toString();
		if(AgencyValidator.validateUUIDString(assignedUserIdString)) 
			this.assigned_user_id = UUID.fromString(assignedUserIdString);
		else throw new ServiceErrorException("invalid id to assigned user");

	}
	private void setAgentTemplateId(Object object) throws ServiceErrorException {
		String agentTemplateIdString = object.toString();
		if(AgencyValidator.validateUUIDString(agentTemplateIdString)) 
			this.agentTemplate_id = UUID.fromString(agentTemplateIdString);
		else throw new ServiceErrorException("invalid id to agent template");

	}
	private void setStructuralNodeLinkId(Object object) throws ServiceErrorException {
		String linkIdString = object.toString();
		if(AgencyValidator.validateUUIDString(linkIdString)) 
			this.structuralNode_link_id = UUID.fromString(linkIdString);
		else throw new ServiceErrorException("invalid id to linked structural node");

	}
	
	public UUID getStructuralNodeLinkId() { return this.structuralNode_link_id; }
	public UUID getAgentTemplateId() { return this.agentTemplate_id;	}
	public UUID getAssignedUserId() { return this.assigned_user_id; }
	public Set<UUID> getDataTagIds() { return this.agent_dataTag_ids; }
	public Boolean isAgentActive() { return this.agent_is_active; }

	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			switch(entry.getKey()) {
				case "structuralNode_link_id":
					setStructuralNodeLinkId(entry.getValue());
					break;
				case "agentTemplate_id":
					setAgentTemplateId(entry.getValue());
					break;
				case "assigned_user_id":
					setAssignedUserId(entry.getValue());
					break;
				case "agent_is_active":
					setAgentIsActive(entry.getValue());
					break;
				case "agent_dataTag_ids":
					setAgentDataTagIds(entry.getValue());
					break;
			}
		}
		return true;
		
	}
	
	
	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException, SQLException {
		setStructuralNodeLinkId(rs.getObject("structuralNode_link_id"));
		setAgentTemplateId(rs.getObject("agentTemplate_id"));
		setAssignedUserId(rs.getObject("assigned_user_id"));
		setAgentDataTagIds(rs.getArray("agent_dataTag_ids").getArray());
		setAgentIsActive(rs.getBoolean("agent_is_active"));
		return true;
	}
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
		PreparedStatement statement = null;
		
		try {
			switch(type) {
			case "create":
				statement = connection.prepareCall("call agency.create_agent(?,?,?,?,?,?)");
				break;
			case "update":
				statement = connection.prepareCall("call agency.update_agent(?,?,?,?,?,?)");
				break;
			}
			
			statement.setObject(1, this.getId());
			statement.setObject(2, this.getStructuralNodeLinkId());
			statement.setObject(3, this.getAgentTemplateId());
			statement.setObject(4, this.getAssignedUserId());
			statement.setBoolean(5, this.isAgentActive());
			statement.setArray(6, connection.createArrayOf("UUID", this.getDataTagIds().toArray()));
			
		} catch(SQLException err) { throw new ServiceErrorException("could not write object to storage statement");}

		
		
		return statement;
	}

	
	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("structuralNode_link_id", this.getStructuralNodeLinkId());
		json_result.put("agentTemplate_id", this.getAgentTemplateId());
		json_result.put("assigned_user_id", this.getAssignedUserId());
		json_result.put("agent_is_active", this.isAgentActive());
		json_result.put("agent_dataTag_ids", this.getDataTagIds());
		
		return json_result.toString();
	
	}

}
