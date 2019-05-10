package simpledoc.utilities;

import java.util.UUID;
import java.util.Map;


public class ValidationHandler {

  public static String getValidStringFor(String key, Map<String, Object> data_set){
    String string = "";
    Object value = data_set.get(key);


    return string;
  }


  public static Map<String, Object> getValidMapFor(String key, Map<String, Object> data_set){
    Map<String, Object> map = null;
    Object value = data_set.get(key);


    return map;
  }


  public static UUID getValidUUIDFor(String key, Map<String, Object> data_set){
    UUID uuid = null;
    Object value = data_set.get(key);


    return uuid;
  }
  public static UUID getValidUUIDFor(String uuid_string){
    UUID uuid = null;

    return uuid;
  }
}
