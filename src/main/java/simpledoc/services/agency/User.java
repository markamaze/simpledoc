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
	User(String string, String type, Map<String, Object> data) throws ServiceErrorException, SQLException {
		super(string, type);
		setUsername(data.get("username").toString());
		setPassword(data.get("password").toString());
		setPropertyValues(data.get("property_values"));
		setAssignedAgentIds(data.get("assigned_agent_ids"));
	}

	
	private void setUsername(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateString(object, 4, 12, false, false)) this.username = object.toString();
		else throw new ServiceErrorException("invalid username");		
	}
	private void setPassword(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateString(object, 8, 32, false, true)) this.password = object.toString();
		else throw new ServiceErrorException("invalid password");
	}
	private void setPropertyValues(Object object) throws ServiceErrorException, SQLException {
		Set<String> propertyValues = new HashSet<String>();

		if(object instanceof ArrayList){
			for(Object item: (ArrayList<?>)object){
				if(item instanceof String){
					String[] kvpair = ((String)item).split("=");
					if(kvpair.length != 2) throw new ServiceErrorException("invalid item structure: Agency.User.property_values");
					else if(AgencyValidator.validateUUIDString(kvpair[0]) == null) throw new ServiceErrorException("invalid item id: Agency.User.property_values");
					else propertyValues.add((String)item);
				}
				else throw new ServiceErrorException("invalid item in property: Agency.User.property_values");
			}
			this.property_values = propertyValues;
		}
		else if(object instanceof PgArray){
			JSONArray asJson = new JSONArray( ((PgArray)object).getArray() );
			for(Object item : asJson){
				if(item instanceof String) propertyValues.add((String)item);
				else throw new ServiceErrorException("");
			}
			this.property_values = propertyValues;
		}
		else throw new ServiceErrorException("invalid item in property: Agency.User.property_values");

	}
	private void setAssignedAgentIds(Object object) throws ServiceErrorException, SQLException{
		Set<UUID> agentIds = new HashSet<UUID>();

		if(object == null) this.assigned_agent_ids = agentIds;

		else if(object instanceof ArrayList){
			for(Object id : (ArrayList<?>)object){
				UUID agentId = AgencyValidator.validateUUIDString(id);
				if(agentId == null) throw new ServiceErrorException("invalid id within property: Agency.User.assigned_agent_ids");
				else agentIds.add(agentId);
			}
			this.assigned_agent_ids = agentIds;
		}
		else if(object instanceof PgArray){
			JSONArray asJson = new JSONArray(((PgArray)object).getArray());
			for(Object id : asJson){
				UUID agentId = AgencyValidator.validateUUIDString(id);
				if(agentId == null) throw new ServiceErrorException("invalid id within property: Agency.User.assigned_agent_ids");
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
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException, SQLException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			if(key.equals("username")) setUsername(value);
			else if(key.equals("password")) setPassword(value);
			else if(key.equals("property_values")) setPropertyValues(value);
			else if(key.equals("assigned_agent_ids")) setAssignedAgentIds(value);
			else throw new ServiceErrorException("attempting to update unknown property: Agency.User.update");
		}
		return true;
	}

	
	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException, SQLException {
		setUsername(rs.getString("username"));
		setPassword(rs.getString("password"));
		setPropertyValues(rs.getObject("property_values"));
		setAssignedAgentIds(rs.getObject("assigned_agent_ids"));

		return true;
	}	
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException, SQLException {
		PreparedStatement statement = null;
		
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
