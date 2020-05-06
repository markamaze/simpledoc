package simpledoc.services.agency;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import simpledoc.exceptions.ServiceErrorException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;
import org.postgresql.jdbc.PgArray;

import simpledoc.services.ModuleObject;

public class Tag extends ModuleObject {

	private String label;
	private String tagType;
	private Set<String> properties;

	Tag(String id, String type) {	super(id, type); }
	Tag(String string, String type, Map<String, Object> data) throws ServiceErrorException, SQLException {
		super(string, type);
		setTagLabel(data.get("label").toString());
		setTagType(data.get("tagType"));
		setTagProperty(data.get("properties"));
	}

	private void setTagLabel(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateString(object, 1, 48, true, true)) this.label = object.toString();
		else throw new ServiceErrorException("invalid label for Tag.label");
	}
	private void setTagType(Object object) throws ServiceErrorException {
		if(object instanceof String) this.tagType = object.toString();
		else throw new ServiceErrorException("invalid property for Tag.tagType");
	}
	private void setTagProperty(Object object) throws ServiceErrorException, SQLException {	
		Set<String> propertySet = new HashSet<String>();
		
		if(object == null) this.properties = propertySet;
		else if(object instanceof ArrayList){
			for(Object item : (ArrayList<?>)object){
				if(item instanceof String){
					String[] kvpair = ((String)item).split("=");
					if(kvpair.length != 3) throw new ServiceErrorException("invalid item structure: Agency.Tag.properties");

					String propertyId = kvpair[0];
					String propertyKey = kvpair[1];
					String valueType = kvpair[2];

					String[] possibleTypes = {"string","date"};
					List<String> typeSet = Arrays.asList(possibleTypes);

					if(propertyId.equals("new_property")) propertyId = UUID.randomUUID().toString();
					else if(AgencyValidator.validateUUIDString(propertyId) == null) throw new ServiceErrorException("invalid item id: Agency.Tag.properties");
					else if(!AgencyValidator.validateString(propertyKey, 1, 0, true, true)) throw new ServiceErrorException("invalid item key: Agency.Tag.properties");
					else if(!typeSet.contains(valueType)) throw new ServiceErrorException("invalid item type: Agency.Tag.properties");
					else propertySet.add(String.join(propertyId, "=", propertyKey, "=", valueType));
				}
				else throw new ServiceErrorException("invalid item: Agency.Tag.properties");
			}
			this.properties = propertySet;
		}
		else if(object instanceof PgArray) {
			JSONArray asJson = new JSONArray( ((PgArray)object).getArray() );
			for(Object item : asJson){
				if(item instanceof String) propertySet.add((String)item);
				else throw new ServiceErrorException("invalid item: Agency.Tag.properties");
			}
			this.properties = propertySet;
		}
		else throw new ServiceErrorException("invalid property for Tag.properties");
	}

	public String getTagLabel() { return this.label; }
	public String getTagType() { return this.tagType; }
	public Set<String> getTagProperty() { return this.properties; }
	
	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException, SQLException {
		for(Entry<String, Object> entry : objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			if(key.equals("label")) setTagLabel(value);
			else if(key.equals("tagType")) setTagType(value);
			else if(key.equals("properties")) setTagProperty(value);
		}
		return true;
	}


	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException, SQLException {
		setTagLabel(rs.getString("label"));
		setTagType(rs.getString("tagtype"));
		setTagProperty(rs.getArray("properties"));
		return true;
	}
	
	
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException, SQLException {
		PreparedStatement statement = null;
		if(type.equals("create")) statement = connection.prepareStatement("call agency.create_tag(?,?,?,?)");
		else if(type.equals("update")) statement = connection.prepareStatement("call agency.update_tag(?,?,?,?)");
			
		UUID uuid;
		if(this.getId().startsWith("n-")) uuid = AgencyValidator.validateUUIDString(this.getId().substring(2));
		else uuid = AgencyValidator.validateUUIDString(this.getId());
		
		statement.setObject(1, uuid);
		statement.setString(2, this.getTagLabel());
		statement.setString(3, this.getTagType());
		statement.setArray(4, connection.createArrayOf("TEXT", this.getTagProperty().toArray()));
		
		return statement;
	}
	
	
	@Override
	public String writeToJson() {

		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("label", this.getTagLabel());
		json_result.put("tagType", this.getTagType());
		json_result.put("properties", this.getTagProperty());
		
		return json_result.toString();
	}

}
