package simpledoc.services.agency;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import simpledoc.exceptions.ServiceErrorException;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.json.JSONObject;
import org.postgresql.util.PGobject;

import java.util.UUID;
import simpledoc.services.ModuleObject;

public class Agent extends ModuleObject {

	UUID agent_user_id;
	UUID structuralNode_id;
	UUID assignment_id;
//	UUID active_role_id;
//	Map<UUID, String> property_values;
	
	Agent(String id, String type) { super(id, type); }
	Agent(String string, String type, Map<String, Object> data) throws ServiceErrorException {
		super(string, type);
		setAgentUserId(data.get("agent_user_id"));
		setStructuralNodeId(data.get("structuralNode_id"));
		setAssignmentId(data.get("assignment_id"));
//		setActiveRoleId(data.get("active_role_id"));
//		setPropertyValues(data.get("property_values"));

	}
	
	private void setAgentUserId(Object object) throws ServiceErrorException {
		UUID uuid = AgencyValidator.validateUUIDString(object);

		if(uuid != null) this.agent_user_id = uuid;
		else throw new ServiceErrorException("invalid id set for Agent.agent_user_id");
	}
	private void setStructuralNodeId(Object object) throws ServiceErrorException {
		UUID uuid = AgencyValidator.validateUUIDString(object);

		if(uuid != null) this.structuralNode_id = uuid;
		else throw new ServiceErrorException("invalid id set for Agent.structuralNode_id");
	}
	private void setAssignmentId(Object object) throws ServiceErrorException {
		UUID uuid = AgencyValidator.validateUUIDString(object);

		if(uuid != null) this.assignment_id = uuid;
		else throw new ServiceErrorException("invalid id set for Agent.assignment_id");
	}
	private void setActiveRoleId(Object object) throws ServiceErrorException {
		UUID uuid = AgencyValidator.validateUUIDString(object);

		if(uuid != null) this.active_role_id = uuid;
		else throw new ServiceErrorException("invalid id set for Agent.active_role_id");
	}
	private void setPropertyValues(Object object) throws ServiceErrorException {
		//TODO: set Property values based on incoming Object type
		if(object instanceof Map) this.property_values = (Map<UUID, String>) object;
		else if(object instanceof PGobject) {
			JSONObject asJson = new JSONObject(((PGobject)object).getValue());
			Map<UUID, String> propertyValues = new HashMap<UUID, String>();
			for(String id : asJson.keySet()) { 
				UUID uuid = AgencyValidator.validateUUIDString(id);

				if(uuid != null) propertyValues.put(uuid, asJson.get(id).toString());
				else throw new ServiceErrorException("invalid uuid found in Agent.property_values");				
			}
			this.property_values = propertyValues;
		}
	}
	
	public UUID getAgentUserId() { return this.agent_user_id; }
	public UUID getStructuralNodeId() { return this.structuralNode_id; }
	public UUID getAssignmentId() { return this.assignment_id; }
	public UUID getActiveRoleId() { return this.active_role_id; }
	public Map<UUID, String> getPropertyValues() { return this.property_values; }
	

	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			if(key.equals("agent_user_id")) setAgentUserId(value);
			else if(key.equals("structuralNode_id")) setStructuralNodeId(value);
			else if(key.equals("assignment_id")) setAssignmentId(value);
//			else if(key.equals("active_role_id")) setActiveRoleId(value);
//			else if(key.equals("property_values")) setPropertyValues(value);
		}
		return true;
		
	}
	
	
	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException, SQLException {
		setAgentUserId(rs.getObject("agent_user_id"));
		setStructuralNodeId(rs.getObject("structuralNode_id"));
		setAssignmentId(rs.getObject("assignment_id"));
//		setActiveRoleId(rs.getObject("active_role_id"));
//		setPropertyValues(rs.getObject("property_values"));
		return true;
	}
	
	
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException, SQLException {
		PreparedStatement statement = null;
		UUID uuid;
		
		if(type.equals("create")) statement = connection.prepareCall("call agency.create_agent(?,?,?,?)");
		else if(type.equals("update")) statement = connection.prepareCall("call agency.update_agent(?,?,?,?)");
			
		if(this.getId().startsWith("n-")) uuid = AgencyValidator.validateUUIDString(this.getId().substring(2));
		else uuid = AgencyValidator.validateUUIDString(this.getId());
		statement.setObject(1, uuid);
		statement.setObject(2, this.getAgentUserId());
		statement.setObject(3, this.getStructuralNodeId());
		statement.setObject(4, this.getAssignmentId());
//		statement.setObject(5, this.getActiveRoleId());
//		statement.setArray(6, null);
		//TODO: set PGObject for property values
//		statement.setArray(6, connection.createArrayOf("UUID", this.getDataTagIds().toArray()));
			
		return statement;
	}

	
	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("agent_user_id", this.getAgentUserId());
		json_result.put("structuralNode_id", this.getStructuralNodeId());
		json_result.put("assignment_id", this.getAssignmentId());
//		json_result.put("active_role_id", this.getActiveRoleId());
//		json_result.put("property_values", this.getPropertyValues());
		
		return json_result.toString();
	
	}

}
