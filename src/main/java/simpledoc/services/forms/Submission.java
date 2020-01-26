package simpledoc.services.forms;

import java.sql.SQLException;

import simpledoc.exceptions.ServiceErrorException;
import java.util.UUID;

import org.json.JSONObject;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Date;
import simpledoc.services.ModuleObject;


public class Submission extends ModuleObject {
  private UUID form_id;
  private UUID section_id;
  private UUID layout_id;
  private UUID element_id;
  private String value;
  private Date submitted_on;
  private UUID submitted_by;

  Submission(UUID id, String type) { super(id, type); }
  Submission(UUID id, String type, Map<String, Object> data) throws ServiceErrorException {
    super(id, type);
    setFormId(data.get("form_id"));
    setSectionId(data.get("section_id"));
    setLayoutId(data.get("layout_id"));
    setElementId(data.get("element_id"));
    setElementValue(data.get("value"));
    setSubmittedOn(data.get("submitted_on"));
    setSubmittedBy(data.get("submitted_by"));
  }


  //TODO: finish writing property setters -> Submission
  private void setFormId(Object object) throws ServiceErrorException {}
  private void setSectionId(Object object) throws ServiceErrorException {}
  private void setLayoutId(Object object) throws ServiceErrorException {}
  private void setElementId(Object object) throws ServiceErrorException {}
  private void setElementValue(Object object) throws ServiceErrorException {}
  private void setSubmittedOn(Object object) throws ServiceErrorException {}
  private void setSubmittedBy(Object object) throws ServiceErrorException {}


  public UUID getFormId() { return this.form_id; }
  public UUID getSectionId() { return this.section_id; }
  public UUID getLayoutId() { return this.layout_id; }
  public UUID getElementId() { return this.element_id; }
  public String getElementValue() { return this.value; }
  public Date getSubmittedOn() { return this.submitted_on; }
  public UUID getSubmittedBy() { return this.submitted_by; }

  @Override
  public boolean update(Map<String, Object> data) throws ServiceErrorException{
    for(Entry<String, Object> entry: data.entrySet()){
      Object key = entry.getKey();
      if(key == "form_id") setFormId(entry.getValue());
      else if(key == "section_id") setSectionId(entry.getValue());
      else if(key == "layout_id") setLayoutId(entry.getValue());
      else if(key == "element_id") setElementId(entry.getValue());
      else if(key == "value") setElementValue(entry.getValue());
      else if(key == "submitted_on") setSubmittedOn(entry.getValue());
      else if(key == "submitted_by") setSubmittedBy(entry.getValue());
      else throw new ServiceErrorException("unknown property in Submission");
    }
    return true;
  }


  @Override
  public boolean readStorageResult(ResultSet resultSet) throws ServiceErrorException {
    try {
      setFormId(resultSet.getObject("form_id"));
      setSectionId(resultSet.getObject("section_id"));
      setLayoutId(resultSet.getObject("layout_id"));
      setElementId(resultSet.getObject("element_id"));
      setElementValue(resultSet.getString("value"));
      setSubmittedOn(resultSet.getObject("submitted_on"));
      setSubmittedBy(resultSet.getObject("submitted_by"));
    } catch(SQLException err) { throw new ServiceErrorException(err + "error reading storage result for Submission"); }

    return true;
  }


  @Override
  public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
    PreparedStatement statement = null;

    try {
      if(type == "create") statement = connection.prepareStatement("call forms.create_formSubmission(?,?,?,?,?,?,?,?)");
      else if(type == "update") statement = connection.prepareStatement("call forms.update_formSubmission(?,?,?,?,?,?,?,?)");

      statement.setObject(1, this.getId());
      statement.setObject(2, this.getFormId());
      statement.setObject(3, this.getSectionId());
      statement.setObject(4, this.getLayoutId());
      statement.setObject(5, this.getElementId());
      statement.setString(6, this.getElementValue());
      statement.setObject(7, this.getSubmittedOn());
      statement.setObject(8, this.getSubmittedBy());
    } catch(SQLException err) { throw new ServiceErrorException(err + "error setting storage statement for Submission"); }

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
    json_result.put("element_id", this.getElementId());
    json_result.put("value", this.getElementValue());
    json_result.put("submitted_on", this.getSubmittedOn());
    json_result.put("submitted_by", this.getSubmittedBy());

    return json_result.toString();
  }

}
