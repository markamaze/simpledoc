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

public class Property extends ModuleObject {
	String property_key;
	String property_value_type;
	
	
	public Property(UUID uuid, String type) { super(uuid, type); }
	public Property(UUID uuid, String type, Map<String, Object> data) throws ServiceErrorException {
		super(uuid, type);
		setPropertyKey(data.get("property_key"));
		setPropertyValueType(data.get("property_value_type"));
	}
	
	private void setPropertyKey(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateString(object, 2, 24, true, false)) this.property_key = object.toString();
		else throw new ServiceErrorException("invalid id set for Property.property_key");
	}
	private void setPropertyValueType(Object object) throws ServiceErrorException {
		//TODO: unsure how this will be structured so am not using string validator for now
		if(object instanceof String) this.property_value_type = (String) object;
		else throw new ServiceErrorException("invalid id set for Property.property_value_type");
	}
	
	public String getPropertyType() { return this.property_key; }
	public String getPropertyValueType() { return this.property_value_type; }

	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			if(key.equals("property_key")) setPropertyKey(value);
			else if(key.equals("property_value_type")) setPropertyValueType(value);
		}
		return true;
		
	}

	@Override
	public boolean readStorageResult(ResultSet rs) throws SQLException, ServiceErrorException {
		setPropertyKey(rs.getString("property_key"));
		setPropertyValueType(rs.getString("property_value_type"));
		return true;
	}

	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException, SQLException {
		PreparedStatement statement = null;
		
		if(type.equals("create")) statement = connection.prepareCall("call agency.create_property(?,?,?)");
		else if(type.equals("update")) statement = connection.prepareCall("call agency.update_property(?,?,?)");
		
		statement.setObject(1, this.getId());
		statement.setString(2, this.getPropertyType());
		statement.setString(3, this.getPropertyValueType());		
		
		return statement;
	}

	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("property_key", this.getPropertyType());
		json_result.put("property_value_type", this.getPropertyValueType());
		
		return json_result.toString();
	}

}
