package simpledoc.services.agency;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.json.JSONObject;

import simpledoc.exceptions.UnsupportedServiceRequest;
import simpledoc.services.ModuleObjectData;
import simpledoc.services.ModuleValidation;



public class AgencyValidator extends ModuleValidation {

  public boolean validateRequest (Set<ModuleObjectData> request_data, String method, List<String> resource)
          throws UnsupportedServiceRequest {

    if(method.equalsIgnoreCase("POST") ||
        method.equalsIgnoreCase("PUT") ||
        method.equalsIgnoreCase("DELETE")){
          if(resource.size() != 1)
            throw new UnsupportedServiceRequest("unsupported url for given method");
        }
    else if(method.equalsIgnoreCase("GET")) {
      //TODO: work out validating GET request url's
      // any elements beyond the first, should be either a uuid or a type of agency object
      // there should be no more than one uuid in the url

      //for now, just validate any get requests

    }
    else throw new UnsupportedServiceRequest("unsupported request method");


    if( request_data != null) {
	    for(ModuleObjectData item: request_data) {
	      String string_id = item.getIdString();
	      String type = item.getType();
	      Map<String, Object> data = item.getObjectData();
	
	      if(validateUUIDString(string_id) == null)
	    	  throw new UnsupportedServiceRequest("invalid id: " + string_id);
	      if(!validateObjectType(type))
	    	  throw new UnsupportedServiceRequest("object type not supported: " + type);
	      if(!validateObjectDataProperties(data, type)) 
	    	  throw new UnsupportedServiceRequest("invalid properties found in object: " + string_id);
	    };
    }
	else if( request_data == null && !method.equalsIgnoreCase("GET"))
		throw new UnsupportedServiceRequest("invalid request structure");

    return true;
  }

  private boolean validateObjectType(String type) {
    switch(type){
		case "AGENCY.AGENT":
		case "AGENCY.ROLE":
		case "AGENCY.NODE":
		case "AGENCY.TAG":
		case "AGENCY.USER":
			return true;
      default: return false;
    }
  }
  private boolean validateObjectDataProperties(Map<String, Object> data, String type) {
	  Field[] fields;
    switch(type) {
    	case "AGENCY.AGENT":
    		fields = Agent.class.getDeclaredFields();
    		break;
    	case "AGENCY.ROLE":
    		fields = Role.class.getDeclaredFields();
    		break;
    	case "AGENCY.NODE":
    		fields = Node.class.getDeclaredFields();
    		break;
    	case "AGENCY.TAG":
    		fields = Tag.class.getDeclaredFields();
    		break;
    	case "AGENCY.USER":
    		fields = User.class.getDeclaredFields();
    		break;
      default: return false;

    }
    
	Set<String> fieldset = new HashSet<String>();
	for(Field f : fields) { 
		String name = f.getName();
		fieldset.add(name); 
	}
	
	for(String property : data.keySet()) {
		if(!fieldset.contains(property)) return false;
    }
    
	return true;
    
  }
  
  



  public static String propertyDefinition(Object property_string) {
	String[] possibleTypes = {"string","date"};
	List<String> typeSet = Arrays.asList(possibleTypes);
	String[] kvpair;
	String id, key, value_type;


	if(property_string instanceof String) kvpair = ((String)property_string).split("=");
	else return null;
	
	if(kvpair.length != 3) return null;
	
	id = kvpair[0];
	key = kvpair[1];
	value_type = kvpair[2];

	if(AgencyValidator.validateUUIDString(id) == null) return null;
	else if(!AgencyValidator.validateString(key, 1, 0, true, true)) return null;
	else if(!typeSet.contains(value_type)) return null;
					
	String propertyString = id + "=" + key + "=" + value_type;
	return propertyString;
  }

  public static String tagType(Object type){
	String[] possibleTypes = {"structural", "agent"};
	List<String> typeSet = Arrays.asList(possibleTypes);
	
	if(type instanceof String && typeSet.contains(type)) return (String)type;
	else return null;
  }

  public static String roleType(Object type){
	String[] possibleTypes = {"supervisor","roleplayer","serviceConsumer","serviceProvider","monitor"};
	List<String> typeSet = Arrays.asList(possibleTypes);
	
	if(type instanceof String && typeSet.contains(type)) return (String)type;
	else return null;
  }

  public static String propertyValues(Object value_string) {
	if(!(value_string instanceof String)) return null;
	String[] kvpair = ((String)value_string).split("=");
	if(kvpair.length != 3) return null;
	else if(AgencyValidator.validateUUIDString(kvpair[0]) == null) return null;
	else if(!(kvpair[1] instanceof String && kvpair[2] instanceof String)) return null;
	return (String)value_string;
  }

  public static Map<String, Object> assignmentObject(Object assignment){
		Map<String, Object> valid_assignment = null;


		if(assignment instanceof Map) {

		}

		else if(assignment instanceof JSONObject){

		}
				
		return valid_assignment;
  }
}
