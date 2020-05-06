package simpledoc.services.agency;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import org.json.JSONObject;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;

public class Agent extends ModuleObject {

	UUID agent_user_id;
	UUID node_id;
	UUID assignment_id;
	
	Agent(String id, String type) { super(id, type); }
	Agent(String string, String type, Map<String, Object> data) throws ServiceErrorException {
		super(string, type);
		setAgentUserId(data.get("agent_user_id"));
		setNodeId(data.get("node_id"));
		setAssignmentId(data.get("assignment_id"));
	}
	
	private void setAgentUserId(Object object) throws ServiceErrorException {
		UUID uuid = AgencyValidator.validateUUIDString(object);

		if(uuid != null) this.agent_user_id = uuid;
		else throw new ServiceErrorException("invalid id set for Agent.agent_user_id");
	}
	private void setNodeId(Object object) throws ServiceErrorException {
		UUID uuid = AgencyValidator.validateUUIDString(object);

		if(uuid != null) this.node_id = uuid;
		else throw new ServiceErrorException("invalid id set for Agent.node_id");
	}
	private void setAssignmentId(Object object) throws ServiceErrorException {
		UUID uuid = AgencyValidator.validateUUIDString(object);

		if(uuid != null) this.assignment_id = uuid;
		else throw new ServiceErrorException("invalid id set for Agent.assignment_id");
	}

	public UUID getAgentUserId() { return this.agent_user_id; }
	public UUID getNodeId() { return this.node_id; }
	public UUID getAssignmentId() { return this.assignment_id; }
	

	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			if(key.equals("agent_user_id")) setAgentUserId(value);
			else if(key.equals("node_id")) setNodeId(value);
			else if(key.equals("assignment_id")) setAssignmentId(value);
			else throw new ServiceErrorException("attempting to update unknown property: Agency.Agent.update");
		}
		return true;
		
	}
	
	
	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException, SQLException {
		setAgentUserId(rs.getObject("agent_user_id"));
		setNodeId(rs.getObject("node_id"));
		setAssignmentId(rs.getObject("assignment_id"));
		return true;
	}
	
	
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException, SQLException {
		PreparedStatement statement = null;
		
		if(type.equals("create")) statement = connection.prepareCall("call agency.create_agent(?,?,?,?)");
		else if(type.equals("update")) statement = connection.prepareCall("call agency.update_agent(?,?,?,?)");
			
		UUID uuid = AgencyValidator.validateUUIDString(this.getId());
		statement.setObject(1, uuid);
		statement.setObject(2, this.getAgentUserId());
		statement.setObject(3, this.getNodeId());
		statement.setObject(4, this.getAssignmentId());
			
		return statement;
	}

	
	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("agent_user_id", this.getAgentUserId());
		json_result.put("node_id", this.getNodeId());
		json_result.put("assignment_id", this.getAssignmentId());
		
		return json_result.toString();
	
	}

}
