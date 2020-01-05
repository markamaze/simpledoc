package simpledoc.services.agency;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import simpledoc.exceptions.ServiceErrorException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;
import org.postgresql.util.PGobject;

import simpledoc.services.ModuleObject;

public class DataTag extends ModuleObject {

	private String dataTag_label;
	private String dataTag_tagType;
	private List<Object> dataTag_properties;
	private List<Object> dataTag_typeObjects;

	DataTag(UUID id, String type) {	super(id, type); }
	DataTag(UUID tag_id, String type, Map<String, Object> data) throws ServiceErrorException {
		super(tag_id, type);
		setDataTagLabel(data.get("dataTag_label").toString());
		setDataTagType(data.get("dataTag_tagType"));
		setDataTagProperties(data.get("dataTag_properties"));
		setTypeObjects(data.get("dataTag_typeObjects"));
	}

	private void setDataTagProperties(Object object) throws ServiceErrorException {	
		if(object instanceof String) this.dataTag_properties = new JSONArray(object).toList();
		else if(object instanceof List) this.dataTag_properties = (List<Object>) object;
		else if(object instanceof PGobject) this.dataTag_properties = new JSONArray(((PGobject)object).getValue()).toList();
		else if(object == null) this.dataTag_properties = new ArrayList<Object>();
		else throw new ServiceErrorException("invalid format for datatag properties");
	}
	private void setDataTagType(Object object) throws ServiceErrorException {
		if(object instanceof String) this.dataTag_tagType = object.toString();
		else throw new ServiceErrorException("invalid arg for if tag is for an agent");
	}
	private void setDataTagLabel(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateString(object.toString(), 1, 48, true, true)) 
			this.dataTag_label = object.toString();
		else throw new ServiceErrorException("invalid label for data tag");
		
	}
	private void setTypeObjects(Object object) throws ServiceErrorException {
		
		if(object instanceof PGobject) this.dataTag_typeObjects = new JSONArray(((PGobject) object).getValue()).toList();
		else if(object instanceof List) this.dataTag_typeObjects = (List<Object>) object;
		else if(object == null) this.dataTag_typeObjects = new ArrayList<>();
		else throw new ServiceErrorException("invalid type object for data tag");
	}

	public String getLabel() { return this.dataTag_label; }
	public String getDataTagType() { return this.dataTag_tagType; }
	public List<Object> getDataTagProperties() { return this.dataTag_properties; }
	public List<Object> getTypeObjects() { return this.dataTag_typeObjects; }
	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry : objectData.entrySet()) {
			switch(entry.getKey()) {
			case "dataTag_label":
				setDataTagLabel(entry.getValue());
				break;
			case "dataTag_tagType":
				setDataTagType(entry.getValue());
				break;
			case "dataTag_properties":
				setDataTagProperties(entry.getValue());
				break;
			case "dataTag_typeObjects":
				setTypeObjects(entry.getValue());
			}
		}
		
		return true;
	}


	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException, SQLException {
		setDataTagLabel(rs.getString("dataTag_label"));
		setDataTagType(rs.getString("dataTag_tagtype"));
		setDataTagProperties(rs.getObject("dataTag_properties"));
		setTypeObjects(rs.getObject("dataTag_typeObjects"));
		return true;
	}
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
		PreparedStatement statement = null;
		try {
			switch(type) {
			case "create":
				statement = connection.prepareStatement("call agency.create_dataTag(?,?,?,?,?)");
				break;
			case "update":
				statement = connection.prepareStatement("call agency.update_dataTag(?,?,?,?,?)");
				break;
			}
			
			PGobject propertiesPG = new PGobject();
			JSONArray propertiesAR = new JSONArray(this.getDataTagProperties());
			propertiesPG.setType("json");
			propertiesPG.setValue(propertiesAR.toString());
			
			PGobject typeObjPG = new PGobject();
			JSONArray typeObjectJSON = new JSONArray(this.getTypeObjects());
			
//			JSONObject typeObjectJSON = new JSONObject(this.getTypeObjects());
			typeObjPG.setType("json");
			typeObjPG.setValue(typeObjectJSON.toString());
			
			statement.setObject(1, this.getId());
			statement.setString(2, this.getLabel());
			statement.setString(3, this.getDataTagType());
			statement.setObject(4, propertiesPG);
			statement.setObject(5, typeObjPG);
		} catch(SQLException err) { throw new ServiceErrorException("could not write storage statement"); }
		
		return statement;
	}
	
	
	@Override
	public String writeToJson() {

		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("dataTag_label", this.getLabel());
		json_result.put("dataTag_tagType", this.getDataTagType());
		json_result.put("dataTag_properties", this.getDataTagProperties());
		json_result.put("dataTag_typeObjects", this.getTypeObjects());
		
		return json_result.toString();
	}

}
