package simpledoc.services.forms;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
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


public class Form extends ModuleObject {
  private String label;
  private Set<UUID> section_ids;
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
	  if(object == null) throw new ServiceErrorException("missing required property: Forms.Form.label");
	  
	  else if(object instanceof String) {
		  if(FormsValidator.validateString(object, 1, 24, true, true)) this.label = (String) object;
	  }
	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Form.label");
  }
  private void setSectionIds(Object object) throws ServiceErrorException, SQLException {
	  Set<UUID> sections = new HashSet<UUID>();
		
	  if(object == null) this.section_ids = sections; 
	  
	  else if(object instanceof ArrayList) {
		for(Object id : (ArrayList<?>)object) {
			UUID uuid = FormsValidator.validateUUIDString(id);
			if(uuid != null) sections.add(uuid);
			else throw new ServiceErrorException("invalid id in dataTag list");
		}
		this.section_ids = sections;
	  }
		
	  else if(object instanceof PgArray) {
		  JSONArray asJson = new JSONArray(((PgArray) object).getArray());
		  if(asJson.length() > 0)
			  for(Object entry : asJson.toList()) {
				  UUID uuid = FormsValidator.validateUUIDString(entry);
				  if(uuid != null) sections.add(uuid);
				  else throw new ServiceErrorException("invalid value for property: Forms.Form.section_ids");
			  }
		  this.section_ids = sections;
	  }
	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Form.section_ids");
  }
  private void setCompletionRules(Object object) throws ServiceErrorException {
	 Map<String, String> rules = new HashMap<String, String>();
	  
	  if(object == null) this.completion_rules = rules;
	  
	  else if(object instanceof Map) {
		  this.completion_rules = (Map<String, String>) object;
	  }
	  
	  else if(object instanceof PGobject) {
			if(((PGobject) object).getType() == "json") {
				JSONObject asJSON = new JSONObject(((PGobject) object).getValue());
				if(asJSON.length() > 0)
					for(Entry<String, Object> entry : asJSON.toMap().entrySet()) {
						if(!FormsValidator.validateCompletionRule(entry)) throw new ServiceErrorException("invalid property value: Forms.Form.completion_rule");
						rules.put(entry.getKey(), (String) entry.getValue());
					}
				this.completion_rules = rules;
			}
	  }
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Form.completion_rules");
  }
  private void setSecuritySettings(Object object) throws ServiceErrorException {
	  Map<String, String> securitySettings = new HashMap<String, String>();
	  
	  if(object == null) this.security_settings = securitySettings;
	  
	  else if(object instanceof Map) {
		  this.security_settings = (Map<String, String>) object;
	  }
	  
	  else if(object instanceof PGobject) {
			if(((PGobject) object).getType() == "json") {
				JSONObject asJSON = new JSONObject(((PGobject) object).getValue());
				if(asJSON.length() > 0)
					for(Entry<String, Object> entry : asJSON.toMap().entrySet()) {
						if(!FormsValidator.validateCompletionRule(entry)) throw new ServiceErrorException("invalid property value: Forms.Form.security_settings");
						securitySettings.put(entry.getKey(), (String) entry.getValue());
					}
				this.security_settings = securitySettings;
			}
	  }
	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Form.security_setting");
  }


  public String getLabel() { return this.label; }
  public Set<UUID> getSectionIds() { return this.section_ids; }
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
      setSectionIds(resultSet.getArray("section_ids"));
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

      statement.setObject(1, this.getId());
      statement.setString(2, this.getLabel());
      statement.setArray(3, connection.createArrayOf("UUID", this.getSectionIds().toArray()));
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
