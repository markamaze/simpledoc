package simpledoc.services.agency;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;
import java.util.UUID;
import java.util.Map.Entry;

import org.json.JSONObject;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;

public class Role extends ModuleObject {
	
	private String role_label;
	private String security_code;

	public Role(String uuid, String type) { super(uuid, type); }
	public Role(String string, String type, Map<String, Object> data) throws ServiceErrorException {
		super(string, type);
		setRoleLabel(data.get("role_label"));
		setSecurityCode(data.get("security_code"));
	}

	private void setRoleLabel(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateString(object, 1, 24, true, true)) this.role_label = object.toString();
		else throw new ServiceErrorException("invalid property for Role.role_label");
		
	}
	private void setSecurityCode(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateSecurity(object)) this.security_code = object.toString();
		else throw new ServiceErrorException("invalid property for Role.security_code");
	}
	
	public String getRoleLabel() { return this.role_label; }
	public String getSecurityCode() { return this.security_code; }
	
	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			if(key.equals("role_label")) setRoleLabel(value);
			else if(key.equals("security_code")) setSecurityCode(value);
		}
		return true;
	}

	@Override
	public boolean readStorageResult(ResultSet rs) throws SQLException, ServiceErrorException {
		setRoleLabel(rs.getString("role_label"));
		setSecurityCode(rs.getString("security_code"));
		return true;
	}

	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws SQLException, ServiceErrorException {
		PreparedStatement statement = null;
		
		if(type.equals("create")) statement = connection.prepareCall("call agency.create_role(?,?,?)");
		else if(type.equals("update")) statement = connection.prepareCall("call agency.update_role(?,?,?)");
	
		UUID uuid;
		if(this.getId().startsWith("n-")) uuid = AgencyValidator.validateUUIDString(this.getId().substring(2));
		else uuid = AgencyValidator.validateUUIDString(this.getId());
		statement.setObject(1, uuid);
		statement.setString(2, this.getRoleLabel());
		statement.setString(3, this.getSecurityCode());

		return statement;
	}

	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("role_label", this.getRoleLabel());
		json_result.put("security_code", this.getSecurityCode());
		
		return json_result.toString();
	}

}
