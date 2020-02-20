package simpledoc.services;

import java.util.UUID;
import simpledoc.exceptions.UnsupportedServiceRequest;

import java.util.List;
import java.util.Set;


public abstract class ModuleValidation {

  public abstract boolean validateRequest(Set<ModuleObjectData> data, String method, List<String> resource)
    throws UnsupportedServiceRequest;


    public static UUID validateUUIDString(Object id_object) {
      try{ 
    	  
    	  if(id_object instanceof UUID) return (UUID)id_object;
    	  else if(id_object instanceof String) {
    		  String id_string = (String) id_object;
    		  if(id_string.startsWith("n-")) return UUID.fromString(id_string.substring(2));
    		  else return UUID.fromString(id_string);
    	  }
    	  else return UUID.fromString(id_object.toString());
      }
      catch (IllegalArgumentException err) { return null; }
      catch(NullPointerException err) { return null; }
    }

    public static boolean validateString(Object test_string, 
    									int min_len, 
    									int max_len, 
    									boolean allow_spaces, 
    									boolean allow_special_chars) {
    	String string;
    	if(test_string instanceof String) string = (String) test_string;
    	else if(test_string instanceof Object) string = test_string.toString();
    	else return false;
    	
        if(string.length() < min_len) return false;
        else if(string.length() > max_len) return false;
        	
        char[] test_chars = string.toCharArray();
        for(char character : test_chars) {
        	if(!allow_spaces && character == ' ') return false;
        	if(!allow_special_chars) {}; //TODO: handle identifying special chars
        }
        	
        	
        return true;    		
    }

    public static boolean validateSecurity(Object security_object) {
      char[] security = security_object.toString().toCharArray();

      if(security.length != 4) return false;
      for(char i: security ){
        Integer asint = Integer.parseInt(Character.toString(i));
        if(asint < 0 || asint > 4) return false;
      }
      return true;
    }

    public static boolean validatePropertyValues() { return false; }
    
    public static boolean validateTagSet() { return false; }
    
}
