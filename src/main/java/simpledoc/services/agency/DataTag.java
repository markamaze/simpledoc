package simpledoc.services.agency;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import simpledoc.exceptions.ServiceErrorException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.UUID;

import org.json.JSONObject;
import org.postgresql.jdbc.PgArray;

import simpledoc.services.ModuleObject;

public class DataTag extends ModuleObject {

	private String dataTag_label;
	private String dataTag_tagType;
	private Set<UUID> dataTag_property_ids;
	private Set<UUID> dataTag_typeObject_ids;

	DataTag(String id, String type) {	super(id, type); }
	DataTag(String string, String type, Map<String, Object> data) throws ServiceErrorException, SQLException {
		super(string, type);
		setDataTagLabel(data.get("dataTag_label").toString());
		setDataTagType(data.get("dataTag_tagType"));
		setDataTagPropertyIds(data.get("dataTag_property_ids"));
		setTypeObjectIds(data.get("dataTag_typeObject_ids"));
	}

	private void setDataTagLabel(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateString(object, 1, 48, true, true)) this.dataTag_label = object.toString();
		else throw new ServiceErrorException("invalid label for DataTag.dataTag_label");
	}
	private void setDataTagType(Object object) throws ServiceErrorException {
		if(object instanceof String) this.dataTag_tagType = object.toString();
		else throw new ServiceErrorException("invalid property for DataTag.dataTag_tagType");
	}
	private void setDataTagPropertyIds(Object object) throws ServiceErrorException, SQLException {	
		if(object instanceof ArrayList) this.dataTag_property_ids = new HashSet<UUID>((ArrayList<UUID>)object);
		else if(object instanceof PgArray) this.dataTag_property_ids = new HashSet<UUID>(Arrays.asList((UUID[])((PgArray)object).getArray()));
		else throw new ServiceErrorException("invalid property for DataTag.dataTag_property_ids");
	}
	private void setTypeObjectIds(Object object) throws ServiceErrorException, SQLException {
		if(object instanceof ArrayList) this.dataTag_typeObject_ids = new HashSet<UUID>((ArrayList<UUID>)object);
		else if(object instanceof PgArray) this.dataTag_typeObject_ids = new HashSet<UUID>(Arrays.asList((UUID[])((PgArray)object).getArray()));
		else throw new ServiceErrorException("invalid type object for data tag");
	}

	public String getDataTagLabel() { return this.dataTag_label; }
	public String getDataTagType() { return this.dataTag_tagType; }
	public Set<UUID> getDataTagPropertyIds() { return this.dataTag_property_ids; }
	public Set<UUID> getTypeObjectIds() { return this.dataTag_typeObject_ids; }
	
	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException, SQLException {
		for(Entry<String, Object> entry : objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			if(key.equals("dataTag_label")) setDataTagLabel(value);
			else if(key.equals("dataTag_tagType")) setDataTagType(value);
			else if(key.equals("dataTag_property_ids")) setDataTagPropertyIds(value);
			else if(key.equals("dataTag_typeObject_ids")) setTypeObjectIds(value);
		}
		return true;
	}


	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException, SQLException {
		setDataTagLabel(rs.getString("dataTag_label"));
		setDataTagType(rs.getString("dataTag_tagtype"));
		setDataTagPropertyIds(rs.getObject("dataTag_property_ids"));
		setTypeObjectIds(rs.getObject("dataTag_typeObject_ids"));
		return true;
	}
	
	
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException, SQLException {
		PreparedStatement statement = null;
		if(type.equals("create")) statement = connection.prepareStatement("call agency.create_dataTag(?,?,?,?,?)");
		else if(type.equals("update")) statement = connection.prepareStatement("call agency.update_dataTag(?,?,?,?,?)");
			
		UUID uuid;
		if(this.getId().startsWith("n-")) uuid = AgencyValidator.validateUUIDString(this.getId().substring(2));
		else uuid = AgencyValidator.validateUUIDString(this.getId());
		
		statement.setObject(1, uuid);
		statement.setString(2, this.getDataTagLabel());
		statement.setString(3, this.getDataTagType());
		statement.setArray(4, connection.createArrayOf("UUID", this.getDataTagPropertyIds().toArray()));
		statement.setObject(5, connection.createArrayOf("UUID", this.getTypeObjectIds().toArray()));
		
		return statement;
	}
	
	
	@Override
	public String writeToJson() {

		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("dataTag_label", this.getDataTagLabel());
		json_result.put("dataTag_tagType", this.getDataTagType());
		json_result.put("dataTag_property_ids", this.getDataTagPropertyIds());
		json_result.put("dataTag_typeObject_ids", this.getTypeObjectIds());
		
		return json_result.toString();
	}

}
