package simpledoc.services.forms;

import java.sql.SQLException;

import simpledoc.exceptions.ServiceErrorException;
import java.util.UUID;

import org.json.JSONObject;
import org.postgresql.jdbc.PgArray;
import org.postgresql.util.PGobject;

import java.util.Set;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import simpledoc.services.ModuleObject;


public class Section extends ModuleObject {
  private String label;
  private UUID form_id;
  private Map<String, UUID> layout_ids;
  private Map<String, String> completion_rules;
  private Map<String, String> security_settings;

  Section(String id, String type) { super(id, type); }
  Section(String id, String type, Map<String, Object> data) throws ServiceErrorException, SQLException {
    super(id, type);
    setLabel(data.get("label"));
    setFormId(data.get("form_id"));
    setLayoutIds(data.get("layout_ids"));
    setCompletionRules(data.get("completion_rules"));
    setSecuritySettings(data.get("security_settings"));
  }


  private void setLabel(Object object) throws ServiceErrorException {
	  if(FormsValidator.validateString(object, 1, 24, true, true)) this.label = (String) object;	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Section.label");
  }
  private void setFormId(Object object) throws ServiceErrorException {
	  UUID uuid = FormsValidator.validateUUIDString(object);
	  if(uuid != null) this.form_id = uuid;  
	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Section.form_id");
  }
  private void setLayoutIds(Object object) throws ServiceErrorException, SQLException {
	  Map<String, UUID> layout_ids = new HashMap<String, UUID>();
	  
	  if(object == null) this.layout_ids = layout_ids;
	  
	  else if(object instanceof Map) {
		  for(Entry<?,?> kv: ((Map<?,?>)object).entrySet()) {
			  String position = (String)kv.getKey();
			  UUID uuid = FormsValidator.validateUUIDString(kv.getValue());
			  if(uuid == null) throw new ServiceErrorException("invalid uuid sent to property: Forms.Section.layout_ids");
			  
			  layout_ids.put(position, uuid);
		  }
		  this.layout_ids = layout_ids;
	  }
	  
	  else if(object instanceof PGobject) {
			JSONObject asJson = new JSONObject(((PGobject)object).getValue());
			for(Entry<?,?> rule : asJson.toMap().entrySet() ) {
				String position = rule.getKey().toString();
				UUID uuid = FormsValidator.validateUUIDString(rule.getValue());
				layout_ids.put(position, uuid);
			};
			this.layout_ids = layout_ids;
	  }
	  
//	  else if(object instanceof PgArray) {
//		  this.layout_ids = new HashSet<UUID>(Arrays.asList((UUID[])((PgArray)object).getArray()));
//	  }
//	  
//	  else if(object instanceof ArrayList) {
//			for(Object id : (ArrayList<?>)object) {
//				UUID uuid = FormsValidator.validateUUIDString(id);
//				if(uuid != null) layout_ids.add(uuid);
//				else throw new ServiceErrorException("invalid id in dataTag list");
//			}
//		  this.layout_ids = layout_ids;
//	  }
	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Section.layout_ids");
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
	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Section.completion_rules");
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
	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Section.security_settings");
  }


  public String getLabel() { return this.label; }
  public UUID getFormId() { return this.form_id; }
  public Map<String, UUID> getLayoutIds() { return this.layout_ids; }
  public Map<String, String> getCompletionRules() { return this.completion_rules; }
  public Map<String, String> getSecuritySettings() { return this.security_settings; }


  @Override
  public boolean update(Map<String, Object> data) throws ServiceErrorException, SQLException{
    for(Entry<String, Object> entry: data.entrySet()){
      Object key = entry.getKey();
      if(key.equals("label")) setLabel(entry.getValue());
      else if(key.equals("form_id")) setFormId(entry.getValue());
      else if(key.equals("layout_ids")) setLayoutIds(entry.getValue());
      else if(key.equals("completion_rules")) setCompletionRules(entry.getValue());
      else if(key.equals("security_settings")) setSecuritySettings(entry.getValue());
      else throw new ServiceErrorException("unknown property in Section");
    }
    return true;
  }


  @Override
  public boolean readStorageResult(ResultSet resultSet) throws ServiceErrorException {
    try {
      setLabel(resultSet.getString("label"));
      setFormId(resultSet.getObject("form_id"));
      setLayoutIds(resultSet.getObject("layout_ids"));
      setCompletionRules(resultSet.getObject("completion_rules"));
      setSecuritySettings(resultSet.getObject("security_settings"));
    } catch(SQLException err) { throw new ServiceErrorException(err + "could not read storage result for Section"); }
    return true;
  }


  @Override
  public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
    PreparedStatement statement = null;

    try {
      if(type == "create") statement = connection.prepareStatement("call forms.create_section(?,?,?,?,?,?)");
      else if(type == "update") statement = connection.prepareStatement("call forms.update_section(?,?,?,?,?,?)");

      PGobject completionRulesPGObj = new PGobject();
      completionRulesPGObj.setType("json");
      completionRulesPGObj.setValue(new JSONObject(this.getCompletionRules()).toString());

      PGobject securitySettingsPGObj = new PGobject();
      securitySettingsPGObj.setType("json");
      securitySettingsPGObj.setValue(new JSONObject(this.getSecuritySettings()).toString());

      PGobject layoutIdsPGObj = new PGobject();
      layoutIdsPGObj.setType("json");
      layoutIdsPGObj.setValue(new JSONObject(this.getLayoutIds()).toString());
      
	  UUID uuid;
	  if(this.getId().startsWith("n-")) uuid = FormsValidator.validateUUIDString(this.getId().substring(2));
	  else uuid = FormsValidator.validateUUIDString(this.getId());
	  
      statement.setObject(1, uuid);
      statement.setString(2, this.getLabel());
      statement.setObject(3, this.getFormId());
      statement.setObject(4, layoutIdsPGObj);
      statement.setObject(5, completionRulesPGObj );
      statement.setObject(6, securitySettingsPGObj );
    } catch(SQLException err) { throw new ServiceErrorException(err + "error setting storage statement for Section"); }

    return statement;
  }


  @Override
  public String writeToJson() {
    JSONObject json_result = new JSONObject();
    json_result.put("id", this.getId());
    json_result.put("type", this.getModuleObjectType());
    json_result.put("label", this.getLabel());
    json_result.put("form_id", this.getFormId());
    json_result.put("layout_ids", this.getLayoutIds());
    json_result.put("completion_rules", this.getCompletionRules());
    json_result.put("security_settings", this.getSecuritySettings());

    return json_result.toString();
  }

}
