package simpledoc.services.agency;

import java.lang.reflect.Field;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
		case "AGENCY.TEMPLATE":
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
    	case "AGENCY.TEMPLATE":
    		fields = Template.class.getDeclaredFields();
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
  
  

}
