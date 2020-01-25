import simpledoc.services.ModuleObject;


public class Section extends ModuleObject {
  private String label;
  private UUID form_id;
  private Set<UUID> layout_ids;
  private List<Object> completion_rules;
  private List<Object> security_settings;

  Section(UUID id, String type) { super(id, type); }
  Section(UUID id, String type, Map<String, Object> data) throws ServiceErrorException {
    super(id, type);
    setLabel(data.get("label"));
    setFormId(data.get("form_id"));
    setLayoutIds(data.get("layout_ids"));
    setCompletionRules(data.get("completion_rules"));
    setSecuritySettings(data.get("security_settings"));
  }


  //TODO: finish writing property setters -> Section
  private void setLabel(Object object) throws ServiceErrorException {}
  private void setFormId(Object object) throws ServiceErrorException {}
  private void setLayoutIds(Object object) throws ServiceErrorException {}
  private void setCompletionRules(Object object) throws ServiceErrorException {}
  private void setSecuritySettings(Object object) throws ServiceErrorException {}


  public String getLabel() { return this.label; }
  public UUID getFormId() { return this.form_id; }
  public Set<UUID> getLayoutIds() { return this.layout_ids; }
  public List<Object> getCompletionRules() { return this.completion_rules; }
  public List<Object> getSecuritySettings() { return this.security_settings; }


  @Override
  public boolean update(Map<String, Object> data) throws ServiceErrorException{
    for(Entry<String, Object> entry: data.entrySet()){
      Object key = entry.getKey();
      if(key == "label") setLabel(entry.getValue());
      else if(key == "form_id") setFormId(entry.getValue());
      else if(key == "layout_ids") setLayoutIds(entry.getValue());
      else if(key == "completion_rules") setCompletionRules(entry.getValue());
      else if(key == "security_settings") setSecuritySettings(entry.getValue());
      else throw new ServiceErrorException("unknown property in Section")
    }
    return true;
  }


  @Override
  public boolean readStorageResult(ResultSet resultSet) throws ServiceErrorException {
    try {
      setLabel(resultSet.getString("label"));
      setFormId(resultSet.getObject("form_id"));
      setLayoutIds(resultSet.getArray("layout_ids").getArray());
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
      completionRulesPGObj.setValue(new JSONArray(this.getCompletionRules()).toString());

      PGobject securitySettingsPGObj = new PGobject();
      securitySettingsPGObj.setType("json");
      securitySettingsPGObj.setValue(new JSONArray(this.getSecuritySettings()).toString());


      statement.setObject(1, this.getId());
      statement.setString(2, this.getLabel());
      statement.setObject(3, this.getFormId());
      statement.setArray(4, connection.createArrayOf("UUID", this.getLayoutIds().toArray()));
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
