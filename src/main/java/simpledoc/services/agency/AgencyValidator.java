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
	
	      if(!validateUUIDString(string_id) && !string_id.equalsIgnoreCase("new_object"))
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
		case "AGENCY.AGENTTEMPLATE":
		case "AGENCY.STRUCTURALNODE":
		case "AGENCY.DATATAG":
		case "AGENCY.USER":
		case "AGENCY.ASSIGNMENT":
		case "AGENCY.ROLE":
		case "AGENCY.PROPERTY":
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
    	case "AGENCY.AGENTTEMPLATE":
    		fields = AgentTemplate.class.getDeclaredFields();
    		break;
    	case "AGENCY.STRUCTURALNODE":
    		fields = StructuralNode.class.getDeclaredFields();
    		break;
    	case "AGENCY.DATATAG":
    		fields = DataTag.class.getDeclaredFields();
    		break;
    	case "AGENCY.USER":
    		fields = User.class.getDeclaredFields();
    		break;
    	case "AGENCY.ASSIGNMENT":
    		fields = Assignment.class.getDeclaredFields();
    		break;
    	case "AGENCY.ROLE":
    		fields = Role.class.getDeclaredFields();
    		break;
    	case "AGENCY.PROPERTY":
    		fields = Property.class.getDeclaredFields();
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
