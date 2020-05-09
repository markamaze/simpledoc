package simpledoc.services.agency;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;
import org.postgresql.jdbc.PgArray;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;



public class User extends ModuleObject {

	private String username;
	private String password;
	private Set<String> property_values;
	private Set<UUID> assigned_agent_ids;

	User(String id, String type) { super(id, type); }
	User(String string, String type, Map<String, Object> data) throws ServiceErrorException {
		super(string, type);
		setUsername(data.get("username").toString());
		setPassword(data.get("password").toString());
		setPropertyValues(data.get("property_values"));
		setAssignedAgentIds(data.get("assigned_agent_ids"));
	}

	
	private void setUsername(Object object) throws ServiceErrorException {
		if(!AgencyValidator.validateString(object, 4, 12, false, false)) throw new ServiceErrorException("invalid property: Agency.User.username");
		this.username = (String)object; 		
	}
	private void setPassword(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateString(object, 8, 32, false, true)) throw new ServiceErrorException("invalid property: Agency.User.password");
		this.password = object.toString();
	}
	private void setPropertyValues(Object object) throws ServiceErrorException {
		Set<String> propertyValues = new HashSet<String>();

		if(object instanceof ArrayList){ //data coming from http request
			for(Object item: (ArrayList<?>)object){
				String valueString = AgencyValidator.propertyValues(item);
				if(valueString == null) throw new ServiceErrorException("invalid item in requested property: Agency.User.property_values");
				else propertyValues.add(valueString);
			}
			this.property_values = propertyValues;
		}
		else if(object instanceof PgArray){ //data coming from storage
			JSONArray asJson;
			try{ asJson = new JSONArray( ((PgArray)object).getArray() ); }
			catch(SQLException err) { throw new ServiceErrorException(String.join("could not read stored property: Agency.User.property_values", err.getMessage())); }

			for(Object item : asJson){
				String valueString = AgencyValidator.propertyValues(item);
				if(valueString == null) throw new ServiceErrorException("invalid item stored in property: Agency.User.property_values");
				else propertyValues.add(valueString);
			}
			this.property_values = propertyValues;
		}
		else throw new ServiceErrorException("invalid item in property: Agency.User.property_values");

	}
	private void setAssignedAgentIds(Object object) throws ServiceErrorException {
		Set<UUID> agentIds = new HashSet<UUID>();

		if(object == null) this.assigned_agent_ids = agentIds;

		else if(object instanceof ArrayList){ //data coming from http request
			for(Object id : (ArrayList<?>)object){
				UUID agentId = AgencyValidator.validateUUIDString(id);
				if(agentId == null) throw new ServiceErrorException("invalid item in requested property: Agency.User.assigned_agent_ids");
				else agentIds.add(agentId);
			}
			this.assigned_agent_ids = agentIds;
		}
		else if(object instanceof PgArray){ //data coming from storage
			JSONArray asJson;
			try{ asJson = new JSONArray(((PgArray)object).getArray()); }
			catch(SQLException err) { throw new ServiceErrorException(String.join("could not read stored property: Agency.User.assigned_agent_ids", err.getMessage())); }

			for(Object id : asJson){
				UUID agentId = AgencyValidator.validateUUIDString(id);
				if(agentId == null) throw new ServiceErrorException("invalid item in stored property: Agency.User.assigned_agent_ids");
				else agentIds.add(agentId);
			}
			this.assigned_agent_ids = agentIds;
		}
		else throw new ServiceErrorException("invalid property: Agency.User.assigned_agent_ids");

	}
	
	public String getUsername() { return this.username; }
	public String getPassword() { return this.password; }
	public Set<String> getPropertyValues() { return this.property_values; }
	public Set<UUID> getAssignedAgentIds() { return this.assigned_agent_ids; }
	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();

			switch(key){
				case "username": setUsername(value); break;
				case "password": setPassword(value); break;
				case "property_values": setPropertyValues(value); break;
				case "assigned_agent_ids": setAssignedAgentIds(value); break;
				default: throw new ServiceErrorException("attempting to update unknown property: Agency.User");
			}
		}
		return true;
	}

	
	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException {
		try {
			setUsername(rs.getString("username"));
			setPassword(rs.getString("password"));
			setPropertyValues(rs.getObject("property_values"));
			setAssignedAgentIds(rs.getObject("assigned_agent_ids"));
		} catch(SQLException err) { throw new ServiceErrorException(String.join("could not read stored data: Agent.User",err.getMessage())); }

		return true;
	}	
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
		PreparedStatement statement = null;
		try {	
			if(type.equals("create")) statement = connection.prepareStatement("call agency.create_user(?,?,?,?,?)");
			else if(type.equals("update")) statement = connection.prepareStatement("call agency.update_user(?,?,?,?,?)");
			
			UUID uuid;
			if(this.getId().startsWith("n-")) uuid = AgencyValidator.validateUUIDString(this.getId().substring(2));
			else uuid = AgencyValidator.validateUUIDString(this.getId());
			statement.setObject(1, uuid);
			statement.setString(2, this.getUsername());
			statement.setString(3, this.getPassword());
			statement.setArray(4, connection.createArrayOf("TEXT", this.getPropertyValues().toArray()));
			statement.setArray(5, connection.createArrayOf("UUID", this.getAssignedAgentIds().toArray()));
		} catch(SQLException err) { throw new ServiceErrorException(String.join("could not write storage object: Agent.User", err.getMessage())); }
			
		return statement;
	}
		
	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("username", this.getUsername());
		json_result.put("password", this.getPassword());
		json_result.put("property_values", this.getPropertyValues());
		json_result.put("assigned_agent_ids", this.getAssignedAgentIds());
		
		return json_result.toString();
	}
	
}
