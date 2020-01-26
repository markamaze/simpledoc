package simpledoc.services.forms;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;
import org.postgresql.util.PGobject;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;


public class Element extends ModuleObject {
  private UUID form_id;
  private UUID section_id;
  private UUID layout_id;
  private String key;
  private List<Object> value_properties;
  private List<Object> completion_rules;
  private List<Object> security_settings;

  Element(UUID id, String type) { super(id, type); }
  Element(UUID id, String type, Map<String, Object> data) throws ServiceErrorException {
    super(id, type);
    setFormId(data.get("form_id"));
    setSectionId(data.get("section_id"));
    setLayoutId(data.get("layout_id"));
    setElementKey(data.get("key"));
    setValueProperties(data.get("value_properties"));
    setCompletionRules(data.get("completion_rules"));
    setSecuritySettings(data.get("security_settings"));
  }


  //TODO: finish writing property setters -> Element
  private void setFormId(Object object) throws ServiceErrorException {}
  private void setSectionId(Object object) throws ServiceErrorException {}
  private void setLayoutId(Object object) throws ServiceErrorException {}
  private void setElementKey(Object object) throws ServiceErrorException {}
  private void setValueProperties(Object object) throws ServiceErrorException {}
  private void setCompletionRules(Object object) throws ServiceErrorException {}
  private void setSecuritySettings(Object object) throws ServiceErrorException {}


  public UUID getFormId() { return this.form_id; }
  public UUID getSectionId() { return this.section_id; }
  public UUID getLayoutId() { return this.layout_id; }
  public String getElementKey() { return this.key; }
  public List<Object> getValueProperties() { return this.value_properties; }
  public List<Object> getCompletionRules() { return this.completion_rules; }
  public List<Object> getSecuritySettings() { return this.security_settings; }


  @Override
  public boolean update(Map<String, Object> data) throws ServiceErrorException{
    for(Entry<String, Object> entry: data.entrySet()){
      Object key = entry.getKey();
      if(key == "form_id") setFormId(entry.getValue());
      else if(key == "section_id") setSectionId(entry.getValue());
      else if(key == "layout_id") setLayoutId(entry.getValue());
      else if(key == "key") setElementKey(entry.getValue());
      else if(key == "value_properties") setValueProperties(entry.getValue());
      else if(key == "completion_rules") setCompletionRules(entry.getValue());
      else if(key == "security_settings") setSecuritySettings(entry.getValue());
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
      setElementKey(resultSet.getString("key"));
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
      if(type == "create") statement = connection.prepareStatement("call forms.create_element(?,?,?,?,?,?,?,?)");
      else if(type == "update") statement = connection.prepareStatement("call forms.update_element(?,?,?,?,?,?,?,?)");

      PGobject valuePropertiesPGObj = new PGobject();
      valuePropertiesPGObj.setType("json");
      valuePropertiesPGObj.setValue(new JSONArray(this.getValueProperties()).toString());

      PGobject completionRulesPGObj = new PGobject();
      completionRulesPGObj.setType("json");
      completionRulesPGObj.setValue(new JSONArray(this.getCompletionRules()).toString());

      PGobject securitySettingsPGObj = new PGobject();
      securitySettingsPGObj.setType("json");
      securitySettingsPGObj.setValue(new JSONArray(this.getSecuritySettings()).toString());


      statement.setObject(1, this.getId());
      statement.setObject(2, this.getFormId());
      statement.setObject(3, this.getSectionId());
      statement.setObject(4, this.getLayoutId());
      statement.setString(5, this.getElementKey());
      statement.setObject(6, valuePropertiesPGObj );
      statement.setObject(7, completionRulesPGObj );
      statement.setObject(8, securitySettingsPGObj );
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
    json_result.put("value_properties", this.getValueProperties());
    json_result.put("completion_rules", this.getCompletionRules());
    json_result.put("security_settings", this.getSecuritySettings());

    return json_result.toString();
  }

}
