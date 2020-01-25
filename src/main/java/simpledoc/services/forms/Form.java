import simpledoc.services.ModuleObject;


public class Form extends ModuleObject {
  private String label;
  private Set<UUID> section_ids;
  private List<Object> completion_rules;
  private List<Object> security_settings;

  Form(UUID id, String type) { super(id, type); }
  Form(UUID id, String type, Map<String, Object> data) throws ServiceErrorException {
    super(id, type);
    setLabel(data.get("label"));
    setSectionIds(data.get("section_ids"));
    setCompletionRules(data.get("completion_rules"));
    setSecuritySettings(data.get("security_settings"));
  }


  //TODO: finish writing property setters -> Form
  private void setLabel(Object object) throws ServiceErrorException {}
  private void setSectionIds(Object object) throws ServiceErrorException {}
  private void setCompletionRules(Object object) throws ServiceErrorException {}
  private void setSecuritySettings(Object object) throws ServiceErrorException {}


  public String getLabel() { return this.label; }
  public Set<UUID> getSectionIds() { return this.section_ids; }
  public List<Object> getCompletionRules() { return this.completion_rules; }
  public List<Object> getSecuritySettings() { return this.security_settings; }


  @Override
  public boolean update(Map<String, Object> data) throws ServiceErrorException{
    for(Entry<String, Object> entry: data.entrySet()){
      Object key = entry.getKey();
      if(key == "label") setLabel(entry.getValue());
      else if(key == "section_ids") setSectionIds(entry.getValue());
      else if(key == "completion_rules") setCompletionRules(entry.getValue());
      else if(key == "security_settings") setSecuritySettings(entry.getValue());
      else throw new ServiceErrorException("unknown property in Form")
    }
    return true;
  }


  @Override
  public boolean readStorageResult(ResultSet resultSet) throws SQLException, ServiceErrorException {
    try {
      setLabel(resultSet.getString("label"));
      setSectionIds(resultSet.getArray("section_ids").getArray());
      setCompletionRules(resultSet.getObject("completion_rules"));
      setSecuritySettings(resultSet.getObject("security_settings"));
    } catch(SQLException err) { throw new ServiceErrorException(err + "could not read storage result for Form"); }

    return true;
  }


  @Override
  public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
    PreparedStatement statement = null;

    try {
      if(type == "create") statement = connection.prepareStatement("call forms.create_section(?,?,?,?,?)");
      else if(type == "update") statement = connection.prepareStatement("call forms.update_section(?,?,?,?,?)");

      PGobject completionRulesPGObj = new PGobject();
      completionRulesPGObj.setType("json");
      completionRulesPGObj.setValue(new JSONArray(this.getCompletionRules()).toString());

      PGobject securitySettingsPGObj = new PGobject();
      securitySettingsPGObj.setType("json");
      securitySettingsPGObj.setValue(new JSONArray(this.getSecuritySettings()).toString());

      statement.setObject(1, this.getId());
      statement.setString(2, this.getLabel());
      statement.setArray(3, connection.createArrayOf("UUID", this.getSectionIds().toArray()));
      statement.setObject(4, completionRulesPGObj );
      statement.setObject(5, securitySettingsPGObj );
    } catch(SQLException err) { throw new ServiceErrorException(err + "error setting storage statement for Section"); }

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
