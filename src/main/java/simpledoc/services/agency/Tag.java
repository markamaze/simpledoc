package simpledoc.services.agency;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import simpledoc.exceptions.ServiceErrorException;

import java.util.ArrayList;
import java.util.HashSet;
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
	private String tag_type;
	private Set<String> tag_properties;

	Tag(String id, String type) {	super(id, type); }
	Tag(String string, String type, Map<String, Object> data) throws ServiceErrorException {
		super(string, type);
		setTagLabel(data.get("label").toString());
		setTagType(data.get("tag_type"));
		setTagProperty(data.get("tag_properties"));
	}

	private void setTagLabel(Object object) throws ServiceErrorException {
		if(!AgencyValidator.validateString(object, 1, 48, true, true)) throw new ServiceErrorException("invalid property: Agency.Tag.label");
		this.label = (String)object; 
	}
	private void setTagType(Object object) throws ServiceErrorException {
		String tagType = AgencyValidator.tagType(object);
		if(tagType == null) throw new ServiceErrorException("invalid property for Tag.tag_type");
		this.tag_type = tagType;		
	}
	private void setTagProperty(Object object) throws ServiceErrorException {	
		Set<String> propertySet = new HashSet<String>();
		
		if(object == null) this.tag_properties = propertySet;
		else if(object instanceof ArrayList){ //data coming from http request
			for(Object item : (ArrayList<?>)object){
				String entry = AgencyValidator.propertyDefinition(item); 
				if(entry == null) throw new ServiceErrorException("invalid item in requested property: Agency.Tag.tag_properties");
				else propertySet.add(entry);
			}
			this.tag_properties = propertySet;
		}
		else if(object instanceof PgArray) { //data coming from storage
			JSONArray asJson;
			try { asJson = new JSONArray( ((PgArray)object).getArray() ); }
			catch(SQLException err) { throw new ServiceErrorException(String.join("could not read stored property: Agency.Tag.tag_properties", err.getMessage())); }

			for(Object item : asJson){
				String entry = AgencyValidator.propertyDefinition(item);
				if(entry == null) throw new ServiceErrorException("invalid item in stored property: Agency.Tag.tag_properties");
				else propertySet.add(entry);
			}
			this.tag_properties = propertySet;
		}
		else throw new ServiceErrorException("invalid property for Tag.tag_properties");
	}

	public String getTagLabel() { return this.label; }
	public String getTagType() { return this.tag_type; }
	public Set<String> getTagProperty() { return this.tag_properties; }
	
	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry : objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();

			switch(key){
				case "label": setTagLabel(value); break;
				case "tag_type": setTagType(value); break;
				case "tag_properties": setTagProperty(value); break;
				default: throw new ServiceErrorException("attempting to update unknown property: Agency.Tag");
			}
		}
		return true;
	}


	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException {
		try {	
			setTagLabel(rs.getString("label"));
			setTagType(rs.getString("tag_type"));
			setTagProperty(rs.getArray("tag_properties"));
		} catch(SQLException err) { throw new ServiceErrorException(String.join("could not read stored data: Agent.Tag",err.getMessage())); }

		return true;
	}
	
	
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
		PreparedStatement statement = null;

		try {
			if(type.equals("create")) statement = connection.prepareStatement("call agency.create_tag(?,?,?,?)");
			else if(type.equals("update")) statement = connection.prepareStatement("call agency.update_tag(?,?,?,?)");
				
			UUID uuid = AgencyValidator.validateUUIDString(this.getId());
			
			statement.setObject(1, uuid);
			statement.setString(2, this.getTagLabel());
			statement.setString(3, this.getTagType());
			statement.setArray(4, connection.createArrayOf("TEXT", this.getTagProperty().toArray()));
		} catch(SQLException err) { throw new ServiceErrorException(String.join("could not write storage object: Agent.Tag", err.getMessage())); }

		return statement;
	}
	
	
	@Override
	public String writeToJson() {

		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("label", this.getTagLabel());
		json_result.put("tag_type", this.getTagType());
		json_result.put("tag_properties", this.getTagProperty());
		
		return json_result.toString();
	}

}
