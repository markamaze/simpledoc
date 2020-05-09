package simpledoc.services.forms;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import org.json.JSONObject;
import org.postgresql.util.PGobject;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;


public class Form extends ModuleObject {
  private String label;
  private Map<String, UUID> section_ids;
  private Map<String, String> completion_rules;
  private Map<String, String> security_settings;

  Form(String id, String type) { super(id, type); }
  Form(String id, String type, Map<String, Object> data) throws ServiceErrorException, SQLException {
    super(id, type);
    setLabel(data.get("label"));
    setSectionIds(data.get("section_ids"));
    setCompletionRules(data.get("completion_rules"));
    setSecuritySettings(data.get("security_settings"));
  }


  private void setLabel(Object object) throws ServiceErrorException {
	  if(FormsValidator.validateString(object, 1, 24, true, true)) this.label = (String) object;
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Form.label");
  }
  private void setSectionIds(Object object) throws ServiceErrorException, SQLException {
	  Map<String, UUID> sections = new HashMap<String, UUID>();
		
	  if(object == null) this.section_ids = sections; 
	  
	  else if(object instanceof Map) {
		  for(Entry<?,?> kv : ((Map<?,?>)object).entrySet()) {
			  String position = (String)kv.getKey();
			  UUID uuid = FormsValidator.validateUUIDString(kv.getValue());
			  sections.put(position, uuid);
		  }
		  this.section_ids = sections;
	  }
	  
	  else if(object instanceof PGobject) {
			JSONObject asJson = new JSONObject(((PGobject)object).getValue());
			for(Entry<?,?> rule : asJson.toMap().entrySet() ) {
				String position = rule.getKey().toString();
				UUID uuid = FormsValidator.validateUUIDString(rule.getValue());
				sections.put(position, uuid);
			};
			this.section_ids = sections;
	  }
	  	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Form.section_ids");
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
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Form.completion_rules");
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
	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Form.security_setting");
  }


  public String getLabel() { return this.label; }
  public Map<String, UUID> getSectionIds() { return this.section_ids; }
  public Map<String, String> getCompletionRules() { return this.completion_rules; }
  public Map<String, String> getSecuritySettings() { return this.security_settings; }


  @Override
  public boolean update(Map<String, Object> data) throws ServiceErrorException, SQLException{
    for(Entry<String, Object> entry: data.entrySet()){
      Object key = entry.getKey();
      if(key.equals("label")) setLabel(entry.getValue());
      else if(key.equals("section_ids")) setSectionIds(entry.getValue());
      else if(key.equals("completion_rules")) setCompletionRules(entry.getValue());
      else if(key.equals("security_settings")) setSecuritySettings(entry.getValue());
      else throw new ServiceErrorException("unknown property in Form");
    }
    return true;
  }


  @Override
  public boolean readStorageResult(ResultSet resultSet) throws SQLException, ServiceErrorException {
    try {
      setLabel(resultSet.getString("label"));
      setSectionIds(resultSet.getObject("section_ids"));
      setCompletionRules(resultSet.getObject("completion_rules"));
      setSecuritySettings(resultSet.getObject("security_settings"));
    } catch(SQLException err) { throw new ServiceErrorException(err + "could not read storage result for Form"); }

    return true;
  }


  @Override
  public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
    PreparedStatement statement = null;

    try {
      if(type == "create") statement = connection.prepareStatement("call forms.create_form(?,?,?,?,?)");
      else if(type == "update") statement = connection.prepareStatement("call forms.update_form(?,?,?,?,?)");

      PGobject completionRulesPGObj = new PGobject();
      completionRulesPGObj.setType("json");
      completionRulesPGObj.setValue(new JSONObject(this.getCompletionRules()).toString());

      PGobject securitySettingsPGObj = new PGobject();
      securitySettingsPGObj.setType("json");
      securitySettingsPGObj.setValue(new JSONObject(this.getSecuritySettings()).toString());

      PGobject sectionIdsPGObj = new PGobject();
      sectionIdsPGObj.setType("json");
      sectionIdsPGObj.setValue(new JSONObject(this.getSectionIds()).toString());
      
	  UUID uuid;
	  if(this.getId().startsWith("n-")) uuid = FormsValidator.validateUUIDString(this.getId().substring(2));
	  else uuid = FormsValidator.validateUUIDString(this.getId());
	  
      statement.setObject(1, uuid);
      statement.setString(2, this.getLabel());
      statement.setObject(3, sectionIdsPGObj);
      statement.setObject(4, completionRulesPGObj );
      statement.setObject(5, securitySettingsPGObj );
    } catch(SQLException err) { throw new ServiceErrorException(err + "error setting storage statement for Form"); }

    return statement;
  }


  @Override
  public String writeToJson() {
    JSONObject json_result = new JSONObject();
    json_result.put("id", this.getId());
    json_result.put("type", this.getModuleObjectType());
    json_result.put("label", this.getLabel());
    json_result.put("section_ids", this.getSectionIds());
    json_result.put("completion_rules", this.getCompletionRules());
    json_result.put("security_settings", this.getSecuritySettings());

    return json_result.toString();
  }

}
