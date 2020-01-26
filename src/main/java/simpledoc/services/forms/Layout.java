package simpledoc.services.forms;

import java.sql.SQLException;

import simpledoc.exceptions.ServiceErrorException;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;
import org.postgresql.util.PGobject;

import java.util.Set;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.List;
import simpledoc.services.ModuleObject;


public class Layout extends ModuleObject {
  private String label;
  private UUID form_id;
  private UUID section_id;
  private Set<UUID> element_ids;
  private List<Object> completion_rules;
  private List<Object> display_settings;

  Layout(UUID id, String type) { super(id, type); }
  Layout(UUID id, String type, Map<String, Object> data) throws ServiceErrorException {
    super(id, type);
    setLabel(data.get("label"));
    setFormId(data.get("form_id"));
    setSectionId(data.get("section_id"));
    setElementIds(data.get("element_ids"));
    setCompletionRules(data.get("completion_rules"));
    setDisplaySettings(data.get("display_settings"));
  }


  //TODO: finish writing property setters -> Layout
  private void setLabel(Object object) throws ServiceErrorException {}
  private void setFormId(Object object) throws ServiceErrorException {}
  private void setSectionId(Object object) throws ServiceErrorException {}
  private void setElementIds(Object object) throws ServiceErrorException {}
  private void setCompletionRules(Object object) throws ServiceErrorException {}
  private void setDisplaySettings(Object object) throws ServiceErrorException {}


  public String getLabel() { return this.label; }
  public UUID getFormId() { return this.form_id; }
  public UUID getSectionId() { return this.section_id; }
  public Set<UUID> getElementIds() { return this.element_ids; }
  public List<Object> getCompletionRules() { return this.completion_rules; }
  public List<Object> getDisplaySettings() { return this.display_settings; }


  @Override
  public boolean update(Map<String, Object> data) throws ServiceErrorException{
    for(Entry<String, Object> entry: data.entrySet()){
      Object key = entry.getKey();
      if(key == "label") setLabel(entry.getValue());
      else if(key == "form_id") setFormId(entry.getValue());
      else if(key == "section_id") setSectionId(entry.getValue());
      else if(key == "element_ids") setElementIds(entry.getValue());
      else if(key == "completion_rules") setCompletionRules(entry.getValue());
      else if(key == "display_settings") setDisplaySettings(entry.getValue());
      else throw new ServiceErrorException("unknown property in Layout");
    }
    return true;
  }


  @Override
  public boolean readStorageResult(ResultSet resultSet) throws ServiceErrorException {
    try {
      setLabel(resultSet.getString("label"));
      setFormId(resultSet.getObject("form_id"));
      setSectionId(resultSet.getObject("section_id"));
      setElementIds(resultSet.getArray("element_ids").getArray());
      setCompletionRules(resultSet.getObject("completion_rules"));
      setDisplaySettings(resultSet.getObject("display_settings"));
    } catch(SQLException err) { throw new ServiceErrorException(err + "could not read storage result for Layout"); }

    return true;
  }


  @Override
  public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
    PreparedStatement statement = null;

    try {
      if(type == "create") statement = connection.prepareStatement("call forms.create_layout(?,?,?,?,?,?,?)");
      else if(type == "update") statement = connection.prepareStatement("call forms.update_layout(?,?,?,?,?,?,?)");

      PGobject completionRulesPGObj = new PGobject();
      completionRulesPGObj.setType("json");
      completionRulesPGObj.setValue(new JSONArray(this.getCompletionRules()).toString());

      PGobject displaySettingsPGObj = new PGobject();
      displaySettingsPGObj.setType("json");
      displaySettingsPGObj.setValue(new JSONArray(this.getDisplaySettings()).toString());


      statement.setObject(1, this.getId());
      statement.setString(2, this.getLabel());
      statement.setObject(3, this.getFormId());
      statement.setObject(4, this.getSectionId());
      statement.setArray(5, connection.createArrayOf("UUID", this.getElementIds().toArray()));
      statement.setObject(6, completionRulesPGObj );
      statement.setObject(7, displaySettingsPGObj );
    } catch(SQLException err) { throw new ServiceErrorException(err + "error setting storage statement for Layout"); }

    return statement;
  }


  @Override
  public String writeToJson() {
    JSONObject json_result = new JSONObject();
    json_result.put("id", this.getId());
    json_result.put("type", this.getModuleObjectType());
    json_result.put("label", this.getLabel());
    json_result.put("form_id", this.getFormId());
    json_result.put("section_id", this.getSectionId());
    json_result.put("element_ids", this.getElementIds());
    json_result.put("completion_rules", this.getCompletionRules());
    json_result.put("display_settings", this.getDisplaySettings());

    return json_result.toString();
  }

}
