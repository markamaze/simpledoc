package simpledoc.services;

import java.util.Map;


public class ModuleObjectData {

  private String object_id;
  private String object_type;
  private Map<String, Object> object_data;
  private String object_data_string;


  public ModuleObjectData(String id, String type, Map<String, Object> data) {
    this.object_id = id;
    this.object_type = type;
    this.object_data = data;
  }
  public ModuleObjectData(String id, String type, String data_string) {
	    this.object_id = id;
	    this.object_type = type;
	    this.object_data_string = data_string;
	  }

  
  public String getIdString(){ return this.object_id; }
  public String getType() { return this.object_type; }
  public Map<String, Object> getObjectData() { return this.object_data; }
  public String getDataString() { return this.object_data_string; }
}
