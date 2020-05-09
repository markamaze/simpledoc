package simpledoc.services.forms;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;
import org.postgresql.jdbc.PgArray;
import org.postgresql.util.PGobject;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;


public class Element extends ModuleObject {
  private UUID form_id;
  private UUID section_id;
  private UUID layout_id;
  private Set<String> key;
  private String value_type;
  private Map<String, String> value_properties;
  private Map<String, String> completion_rules;
  private Map<String, String> security_settings;

  Element(String id, String type) { super(id, type); }
  Element(String id, String type, Map<String, Object> data) throws ServiceErrorException, SQLException {
    super(id, type);
    setFormId(data.get("form_id"));
    setSectionId(data.get("section_id"));
    setLayoutId(data.get("layout_id"));
    setElementKey(data.get("key"));
    setValueType(data.get("value_type"));
    setValueProperties(data.get("value_properties"));
    setCompletionRules(data.get("completion_rules"));
    setSecuritySettings(data.get("security_settings"));
  }


  private void setFormId(Object object) throws ServiceErrorException {
	  UUID uuid = FormsValidator.validateUUIDString(object);
	  if(uuid != null) this.form_id = uuid;
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Element.form_id");
  }
  private void setSectionId(Object object) throws ServiceErrorException {
	  UUID uuid = FormsValidator.validateUUIDString(object);
	  if(uuid != null) this.section_id = uuid;	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Element.section_id");
  }
  private void setLayoutId(Object object) throws ServiceErrorException {
	  UUID uuid = FormsValidator.validateUUIDString(object);
	  if(uuid != null) this.layout_id = uuid;	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Element.section_id");
  }
  private void setElementKey(Object object) throws ServiceErrorException, SQLException {
	  Set<String> keySet = new HashSet<String>();
	  
	  if(object instanceof ArrayList) {
		  for(Object key: (ArrayList<?>)object) {
			  if(key instanceof String) 
				  keySet.add((String)key);
			  else if(key instanceof ArrayList && ((ArrayList<?>)key).size() == 2) 
				  keySet.add(new JSONArray((ArrayList<?>)key).toString());
			  else throw new ServiceErrorException("invalid key structure sent to property: Forms.Element.key");
		  }
		  this.key = keySet;
	  }
	  
	  else if(object instanceof PgArray) {
		  for(Object key_set : Arrays.asList(((PgArray)object).getArray()) )
			  if(key_set instanceof String[])
				  for(String key : (String[])key_set) keySet.add(key);
			
		  this.key = keySet;
	  }
	  
	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Element.key");
  }
  private void setValueType(Object object) throws ServiceErrorException {
	  if(object instanceof String) this.value_type = object.toString();
	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Element.value_type");
  }
  private void setValueProperties(Object object) throws ServiceErrorException {
	   
	  Map<String, String> valueProperties = new HashMap<String, String>();
	  
	  if(object == null) this.value_properties = valueProperties;
	  
	  else if(object instanceof Map) {
		  ((Map<?,?>) object).forEach((key, value) -> {
			  if(key instanceof String && value instanceof String) {
				  valueProperties.put((String)key, (String)value);
			  }
		  });
		  this.value_properties = valueProperties;
	  }
	  
	  else if(object instanceof PGobject) {
			JSONObject asJson = new JSONObject(((PGobject)object).getValue());
			for(Entry<?,?> rule : asJson.toMap().entrySet() ) { 
				valueProperties.put(rule.getKey().toString(), rule.getValue().toString());
			};
			this.value_properties = valueProperties;	
	  }
	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Element.value_properties");
  }
  private void setCompletionRules(Object object) throws ServiceErrorException {
	  Map<String, String> completionRules = new HashMap<String, String>();
	  
	  if(object == null) this.completion_rules = completionRules;
	  
	  else if(object instanceof Map) {
		  ((Map<?,?>) object).forEach((key, value) -> {
			  if(key instanceof String && value instanceof String) {
				  completionRules.put((String)key, (String)value);
			  }
		  });
		  this.completion_rules = completionRules;
	  }
	  
	  else if(object instanceof PGobject) {
			JSONObject asJson = new JSONObject(((PGobject)object).getValue());
			for(Entry<?,?> rule : asJson.toMap().entrySet() ) { 
				completionRules.put(rule.getKey().toString(), rule.getValue().toString());
			};
			this.completion_rules = completionRules;	  
	  }
	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Element.completion_rules");
  }
  private void setSecuritySettings(Object object) throws ServiceErrorException {
	  Map<String, String> securitySettings = new HashMap<String, String>();
	  
	  if(object == null) this.security_settings = securitySettings;
	  
	  else if(object instanceof Map) {
		  ((Map<?,?>) object).forEach((key, value) -> {
			  if(key instanceof String && value instanceof String) {
				  securitySettings.put((String)key, (String)value);
			  }
		  });
		  this.security_settings = securitySettings;
	  }
	  
	  else if(object instanceof PGobject) {
			JSONObject asJson = new JSONObject(((PGobject)object).getValue());
			for(Entry<?,?> rule : asJson.toMap().entrySet() ) { 
				securitySettings.put(rule.getKey().toString(), rule.getValue().toString());
			};
			this.security_settings = securitySettings;	
	  }
	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Element.security_settings");
  }


  public UUID getFormId() { return this.form_id; }
  public UUID getSectionId() { return this.section_id; }
  public UUID getLayoutId() { return this.layout_id; }
  public Set<String> getElementKey() { return this.key; }
  public String getValueType() { return this.value_type; }
  public Map<String, String> getValueProperties() { return this.value_properties; }
  public Map<String, String> getCompletionRules() { return this.completion_rules; }
  public Map<String, String> getSecuritySettings() { return this.security_settings; }


  @Override
  public boolean update(Map<String, Object> data) throws ServiceErrorException, SQLException{
    for(Entry<String, Object> entry: data.entrySet()){
      Object key = entry.getKey();
      if(key.equals("form_id")) setFormId(entry.getValue());
      else if(key.equals("section_id")) setSectionId(entry.getValue());
      else if(key.equals("layout_id")) setLayoutId(entry.getValue());
      else if(key.equals("key")) setElementKey(entry.getValue());
      else if(key.equals("value_type")) setValueType(entry.getValue());
      else if(key.equals("value_properties")) setValueProperties(entry.getValue());
      else if(key.equals("completion_rules")) setCompletionRules(entry.getValue());
      else if(key.equals("security_settings")) setSecuritySettings(entry.getValue());
      else throw new ServiceErrorException("unknown property in Element");
    }
    return true;
  }


  @Override
  public boolean readStorageResult(ResultSet resultSet) throws ServiceErrorException {
    try{
      setFormId(resultSet.getObject("form_id"));
      setSectionId(resultSet.getObject("section_id"));
      setLayoutId(resultSet.getObject("layout_id"));
      setElementKey(resultSet.getArray("key"));
      setValueType(resultSet.getString("value_type"));
      setValueProperties(resultSet.getObject("value_properties"));
      setCompletionRules(resultSet.getObject("completion_rules"));
      setSecuritySettings(resultSet.getObject("security_settings"));
    } catch(SQLException err) { throw new ServiceErrorException(err + "could not read storage result for Element"); }

    return true;
  }


  @Override
  public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
    PreparedStatement statement = null;

    try {
      if(type == "create") statement = connection.prepareStatement("call forms.create_element(?,?,?,?,?,?,?,?,?)");
      else if(type == "update") statement = connection.prepareStatement("call forms.update_element(?,?,?,?,?,?,?,?,?)");

      PGobject valuePropertiesPGObj = new PGobject();
      valuePropertiesPGObj.setType("json");
      valuePropertiesPGObj.setValue(new JSONObject(this.getValueProperties()).toString());

      PGobject completionRulesPGObj = new PGobject();
      completionRulesPGObj.setType("json");
      completionRulesPGObj.setValue(new JSONObject(this.getCompletionRules()).toString());

      PGobject securitySettingsPGObj = new PGobject();
      securitySettingsPGObj.setType("json");
      securitySettingsPGObj.setValue(new JSONObject(this.getSecuritySettings()).toString());

	  UUID uuid;
	  if(this.getId().startsWith("n-")) uuid = FormsValidator.validateUUIDString(this.getId().substring(2));
	  else uuid = FormsValidator.validateUUIDString(this.getId());
	  
      statement.setObject(1, uuid);
      statement.setObject(2, this.getFormId());
      statement.setObject(3, this.getSectionId());
      statement.setObject(4, this.getLayoutId());
      statement.setArray(5, connection.createArrayOf("TEXT", this.getElementKey().toArray()));
      statement.setString(6, this.getValueType());
      statement.setObject(7, valuePropertiesPGObj );
      statement.setObject(8, completionRulesPGObj );
      statement.setObject(9, securitySettingsPGObj );
    } catch(SQLException err) { throw new ServiceErrorException(err + "error setting storage statement for FormSubmission"); }

    return statement;
  }


  @Override
  public String writeToJson() {
    JSONObject json_result = new JSONObject();
    json_result.put("id", this.getId());
    json_result.put("type", this.getModuleObjectType());
    json_result.put("form_id", this.getFormId());
    json_result.put("section_id", this.getSectionId());
    json_result.put("layout_id", this.getLayoutId());
    json_result.put("key", this.getElementKey());
    json_result.put("value_type", this.getValueType());
    json_result.put("value_properties", this.getValueProperties());
    json_result.put("completion_rules", this.getCompletionRules());
    json_result.put("security_settings", this.getSecuritySettings());

    return json_result.toString();
  }

}
