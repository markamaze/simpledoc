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

	
	private void setUsername(String uname) throws ServiceErrorException {
		if(AgencyValidator.validateString(uname, 4, 12, false, false)) 
			this.username = uname;
		else throw new ServiceErrorException("invalid username");
				
	}
	private void setPassword(String pword) throws ServiceErrorException {
		if(AgencyValidator.validateString(pword, 8, 32, false, true)) 
			this.password = pword;
		else throw new ServiceErrorException("invalid password");
	}
	
	public String getUsername() { return this.username; }
	public String getPassword() { return this.password; }
	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			switch(entry.getKey()) {
			case "username":
				setUsername(entry.getValue().toString());
				break;
			case "password":
				setPassword(entry.getValue().toString());
				break;
			}
		}
		return true;
	}

	
	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException {
		try {
			setUsername(rs.getString("username"));
			setPassword(rs.getString("password"));
		} catch (SQLException e) {throw new ServiceErrorException("could not read values recieved from storage");}

		return true;
	}	
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
		PreparedStatement statement = null;
		
		try {
			switch(type) {
				case "create":
					statement = connection.prepareStatement("call agency.create_user(?,?,?)");
					break;
				case "update":
					statement = connection.prepareStatement("call agency.update_user(?,?,?)");
					break;
			}

			statement.setObject(1, this.getId());
			statement.setString(2, this.getUsername());
			statement.setString(3, this.getPassword());
			
		} catch (SQLException e) {
			throw new ServiceErrorException("could not write values to storage statement");
		}
		
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
