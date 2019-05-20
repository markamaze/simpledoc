package simpledoc.utilities;

import java.util.Map;
import java.util.UUID;





public class ValidationObject {
  private boolean isValid;
  private String string_value;
  private UUID uuid_value;
  private Map<String, Object> map_value;


  public ValidationObject(Object value, Class<?> value_type) {
    //switch on value_type class parameter
    //whichever class type we are validating,
    //  we will take the object and assure that it is of that type
    //set isValid flag and value appropriate to class
    //if not valid, set values to null and isValid to false;
  }



  public boolean isValid(){ return this.isValid; }

  public String getStringValue() { return this.string_value; }
  public UUID getUUIDValue() { return this.uuid_value; }
  public Map<String, ?> getMapValue() { return this.map_value; }

}
