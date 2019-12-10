package simpledoc;

import java.util.Map;


public class RequestData {

  private String object_id;
  private String object_type;
  private Map<String, Object> object_data;


  public RequestData(String id, String type, Map<String, Object> data) {
    this.object_id = id;
    this.object_type = type;
    this.object_data = data;
  }


  public String getIdString(){ return object_id; }
  public String getType() { return object_type; }
  public Map<String, Object> getObjectData() { return object_data; }
}
