package simpledoc.services;

import java.util.UUID;
import simpledoc.exceptions.UnsupportedServiceRequest;

import java.util.List;
import java.util.Set;


public abstract class ModuleValidation {

  public abstract boolean validateRequest(Set<ModuleObjectData> data, String method, List<String> resource)
    throws UnsupportedServiceRequest;


    public static boolean validateUUIDString(String id_string) {
      //TODO BUG: returning without throwing exception when what seems to be an invalid uuid sent in some occasions
    	// got what's happening, UUID.fromString is just filling in leading zeros when missing a few digits
      try{ UUID.fromString(id_string.toString()); } 
      catch (IllegalArgumentException err) { return false; }
      return true;
    }

    public static boolean validateString(String test_string, 
    									int min_len, 
    									int max_len, 
    									boolean allow_spaces, 
    									boolean allow_special_chars) {
    	if(test_string.length() < min_len) return false;
    	if(test_string.length() > max_len) return false;
    	char[] test_chars = test_string.toCharArray();
    	for(char character : test_chars) {
    		if(!allow_spaces) {
    			if(character == ' ') return false;  		
    		}
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

}
