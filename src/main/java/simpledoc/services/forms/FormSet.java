package simpledoc.services.forms;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;
import org.postgresql.util.PGobject;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;


public class FormSet extends ModuleObject {
  private String label;
  private Set<UUID> form_ids;
  private List<Object> completion_rules;
  private List<Object> security_settings;

  FormSet(String id, String type) { super(id, type); }
  FormSet(String id, String type, Map<String, Object> data) throws ServiceErrorException {
    super(id, type);
    setLabel(data.get("label"));
    setFormIds(data.get("form_ids"));
    setCompletionRules(data.get("completion_rules"));
    setSecuritySettings(data.get("security_settings"));
  }


  //TODO: finish writing property setters -> FormSet
  private void setLabel(Object object) throws ServiceErrorException {}
  private void setFormIds(Object object) throws ServiceErrorException {}
  private void setCompletionRules(Object object) throws ServiceErrorException {}
  private void setSecuritySettings(Object object) throws ServiceErrorException {}


  public String getLabel() { return this.label; }
  public Set<UUID> getFormIds() { return this.form_ids; }
  public List<Object> getCompletionRules() { return this.completion_rules; }
  public List<Object> getSecuritySettings() { return this.security_settings; }


  @Override
  public boolean update(Map<String, Object> data) throws ServiceErrorException{
    for(Entry<String, Object> entry: data.entrySet()){
      Object key = entry.getKey();
      if(key == "label") setLabel(entry.getValue());
      else if(key == "form_ids") setFormIds(entry.getValue());
      else if(key == "completion_rules") setCompletionRules(entry.getValue());
      else if(key == "security_settings") setSecuritySettings(entry.getValue());
      else throw new ServiceErrorException("unknown property in FormSet");
    }
    return true;
  }


  @Override
  public boolean readStorageResult(ResultSet resultSet) throws ServiceErrorException {
    try {
      setLabel(resultSet.getString("label"));
      setFormIds(resultSet.getArray("form_ids").getArray());
      setCompletionRules(resultSet.getObject("completion_rules"));
      setSecuritySettings(resultSet.getObject("security_settings"));
    } catch(SQLException err) { throw new ServiceErrorException(err + "error reading storage result for FormSet"); }
    return true;
  }


  @Override
  public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
    PreparedStatement statement = null;

    try {
      if(type == "create") statement = connection.prepareStatement("call forms.create_formSet(?,?,?,?,?)");
      else if(type == "update") statement = connection.prepareStatement("call forms.update_formSet(?,?,?,?,?)");

      PGobject completionRulesPGObj = new PGobject();
      completionRulesPGObj.setType("json");
      completionRulesPGObj.setValue(new JSONArray(this.getCompletionRules()).toString());

      PGobject securitySettingsPGObj = new PGobject();
      securitySettingsPGObj.setType("json");
      securitySettingsPGObj.setValue(new JSONArray(this.getSecuritySettings()).toString());


      statement.setObject(1, this.getId());
      statement.setObject(2, this.getLabel());
      statement.setObject(3, this.getFormIds());
      statement.setObject(4, completionRulesPGObj );
      statement.setObject(5, securitySettingsPGObj);
    } catch(SQLException err) { throw new ServiceErrorException(err + "error setting storage statement for FormSet"); }

    return statement;
  }


  @Override
  public String writeToJson() {
    JSONObject json_result = new JSONObject();
    json_result.put("id", this.getId());
    json_result.put("type", this.getModuleObjectType());
    json_result.put("label", this.getLabel());
    json_result.put("form_ids", this.getFormIds());
    json_result.put("completion_rules", this.getCompletionRules());
    json_result.put("security_settings", this.getSecuritySettings());

    return json_result.toString();
  }

}
