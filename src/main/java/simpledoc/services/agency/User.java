package simpledoc.services.agency;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import simpledoc.exceptions.ServiceErrorException;
import java.util.Map;
import java.util.Map.Entry;

import org.json.JSONObject;

import java.util.UUID;

import simpledoc.services.ModuleObject;

public class User extends ModuleObject {

	private String username;
	private String password;

	User(UUID id, String type) { super(id, type); }
	User(UUID user_id, String type, Map<String, Object> data) throws ServiceErrorException {
		super(user_id, type);
		setUsername(data.get("username").toString());
		setPassword(data.get("password").toString());
	}

	
	private void setUsername(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateString(object, 4, 12, false, false)) this.username = object.toString();
		else throw new ServiceErrorException("invalid username");		
	}
	private void setPassword(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateString(object, 8, 32, false, true)) this.password = object.toString();
		else throw new ServiceErrorException("invalid password");
	}
	
	public String getUsername() { return this.username; }
	public String getPassword() { return this.password; }
	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			if(key.equals("username")) setUsername(value);
			else if(key.equals("password")) setPassword(value);
		}
		return true;
	}

	
	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException, SQLException {
		setUsername(rs.getString("username"));
		setPassword(rs.getString("password"));

		return true;
	}	
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException, SQLException {
		PreparedStatement statement = null;
		
		if(type.equals("create")) statement = connection.prepareStatement("call agency.create_user(?,?,?)");
		else if(type.equals("update")) statement = connection.prepareStatement("call agency.update_user(?,?,?)");
		
		statement.setObject(1, this.getId());
		statement.setString(2, this.getUsername());
		statement.setString(3, this.getPassword());
			
		return statement;
	}
		
	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("username", this.getUsername());
		json_result.put("password", this.getPassword());
		
		return json_result.toString();
	}
	
}
