package simpledoc.services.forms;

import java.sql.SQLException;

import simpledoc.exceptions.ServiceErrorException;
import java.util.UUID;

import org.json.JSONObject;
import org.postgresql.jdbc.PgArray;
import org.postgresql.util.PGobject;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import simpledoc.services.ModuleObject;


public class Layout extends ModuleObject {
  private String label;
  private UUID form_id;
  private UUID section_id;
  private Set<UUID> element_ids;
  private Map<String, String> completion_rules;
  private Map<String, Object> display_settings;

  Layout(String id, String type) { super(id, type); }
  Layout(String id, String type, Map<String, Object> data) throws ServiceErrorException, SQLException {
    super(id, type);
    setLabel(data.get("label"));
    setFormId(data.get("form_id"));
    setSectionId(data.get("section_id"));
    setElementIds(data.get("element_ids"));
    setCompletionRules(data.get("completion_rules"));
    setDisplaySettings(data.get("display_settings"));
  }


  private void setLabel(Object object) throws ServiceErrorException {
	  if(FormsValidator.validateString(object, 1, 24, true, true))
		  this.label = object.toString();	  
	  else throw new ServiceErrorException("invalid property: Forms.Layout.label");
  }
  private void setFormId(Object object) throws ServiceErrorException {
	  UUID uuid = FormsValidator.validateUUIDString(object);
	  if(uuid != null) this.form_id = uuid;  
	  else throw new ServiceErrorException("invalid property: Forms.Layout.form_id");
  }
  private void setSectionId(Object object) throws ServiceErrorException {
	  UUID uuid = FormsValidator.validateUUIDString(object);
	  if(uuid != null) this.section_id = uuid;	  
	  else throw new ServiceErrorException("invalid property: Forms.Layout.section_id");
  }
  private void setElementIds(Object object) throws ServiceErrorException, SQLException {
	  Set<UUID> elementIds = new HashSet<UUID>();

	  
	  if(object == null) this.element_ids = elementIds;
	  
	  else if(object instanceof PgArray) {
		  this.element_ids = new HashSet<UUID>(Arrays.asList((UUID[])((PgArray)object).getArray()));
	  }
	  
	  else if(object instanceof ArrayList) {
			for(Object id : (ArrayList<?>)object) {
				UUID uuid = FormsValidator.validateUUIDString(id);
				if(uuid != null) elementIds.add(uuid);
				else throw new ServiceErrorException("invalid id in dataTag list");
			}
		  this.element_ids = elementIds;
	  }
	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Layout.element_ids");
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
	  
  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Layout.completion_rules");

  }
  private void setDisplaySettings(Object object) throws ServiceErrorException {
	  
	  Map<String, Object> displaySettings = new HashMap<String, Object>();
	  
	  if(object == null) this.display_settings = displaySettings;
	  
	  else if(object instanceof Map) {
		  for(Entry<?,?> entry : ((Map<?,?>)object).entrySet()) {
			  displaySettings.put(entry.getKey().toString(), entry.getValue());
		  }

		  this.display_settings = displaySettings;
	  }
	  
	  else if(object instanceof PGobject) {
			JSONObject asJson = new JSONObject(((PGobject)object).getValue());
			for(Entry<?,?> rule : asJson.toMap().entrySet() ) { 
				String key = rule.getKey().toString();
				Object value = rule.getValue();
				
				
				displaySettings.put(key, value);
			};
			this.display_settings = displaySettings;	
	  }
	  
	  else throw new ServiceErrorException("unhandled object type sent to property: Forms.Layout.display_settings");

  }


  public String getLabel() { return this.label; }
  public UUID getFormId() { return this.form_id; }
  public UUID getSectionId() { return this.section_id; }
  public Set<UUID> getElementIds() { return this.element_ids; }
  public Map<String, String> getCompletionRules() { return this.completion_rules; }
  public Map<String, Object> getDisplaySettings() { return this.display_settings; }


  @Override
  public boolean update(Map<String, Object> data) throws ServiceErrorException, SQLException{
    for(Entry<String, Object> entry: data.entrySet()){
      Object key = entry.getKey();
      if(key.equals("label")) setLabel(entry.getValue());
      else if(key.equals("form_id")) setFormId(entry.getValue());
      else if(key.equals("section_id")) setSectionId(entry.getValue());
      else if(key.equals("element_ids")) setElementIds(entry.getValue());
      else if(key.equals("completion_rules")) setCompletionRules(entry.getValue());
      else if(key.equals("display_settings")) setDisplaySettings(entry.getValue());
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
      setElementIds(resultSet.getArray("element_ids"));
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
      completionRulesPGObj.setValue(new JSONObject(this.getCompletionRules()).toString());

      PGobject displaySettingsPGObj = new PGobject();
      displaySettingsPGObj.setType("json");
      displaySettingsPGObj.setValue(new JSONObject(this.getDisplaySettings()).toString());

	  UUID uuid;
	  if(this.getId().startsWith("n-")) uuid = FormsValidator.validateUUIDString(this.getId().substring(2));
	  else uuid = FormsValidator.validateUUIDString(this.getId());
	  
      statement.setObject(1, uuid);
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
