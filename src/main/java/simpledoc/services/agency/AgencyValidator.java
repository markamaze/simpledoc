package simpledoc.services.agency;

import java.util.HashMap;

import simpledoc.exceptions.ServiceErrorException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import simpledoc.RequestData;
import simpledoc.exceptions.UnsupportedServiceRequest;
import simpledoc.services.ModuleValidation;



public class AgencyValidator extends ModuleValidation {

  @Override
  public boolean validateRequest (Set<RequestData> request_data, String method, List<String> resource)
          throws UnsupportedServiceRequest {

    //this portion will validate the resource against the method
    if(method.equalsIgnoreCase("POST") ||
        method.equalsIgnoreCase("PUT") ||
        method.equalsIgnoreCase("DELETE")){
          if(resource.size() != 1) /*for these methods, all data will be in the request body*/
            throw new UnsupportedServiceRequest("unsupported url for given method");
        }
    else if(method.equalsIgnoreCase("GET")) {
      //TODO: work out validating GET request url's
      // any elements beyond the first, should be either a uuid or a type of agency object (category, agent, definition)
      // there should be no more than one uuid in the url
      // if a uuid is in the resource path, it should be either the second (after "/Agency") or the last (or both)
      //    /Agency/UUID -> gets a single resource by id
      //    /Agency/(agency object) -> gets all resources of the agency object type specified
      //    /Agency/UUID/agent -> gets all agents associated with the given resource id
      //    /Agency/UUID/category -> gets category objects of the given resource id
      //    /Agency/UUID/definition -> gets definition objects of the given resource id


      //for now, just validate any get requests

    }
    else throw new UnsupportedServiceRequest("unsupported request method");




    //this portion will validate the contents of the data portion of the http request body
    if( request_data != null)
    for(RequestData item: request_data) {
      String string_id = item.getIdString();
      String type = item.getType();
      Map<String, Object> data = item.getObjectData();


      if(!validIdString(string_id, method)) throw new UnsupportedServiceRequest("invalid object id");

      if(!validObjectType(type)) throw new UnsupportedServiceRequest("unsupported object type");

      if(!validObjectDataStructure(data, type)) throw new UnsupportedServiceRequest("invalid object data structure");
    };

    //if it gets this far, then no exceptions were thrown so all should be good
    return true;
  }
  private boolean validIdString(String string_id, String method){

    if(string_id.equalsIgnoreCase("new_object") && method.equalsIgnoreCase("POST")) return true;

    else try{
      UUID.fromString(string_id);
      return true;
    }
    catch(IllegalArgumentException err) { return false; }
  }
  private boolean validObjectType(String type){
    switch(type){
      case "AGENCY.CATEGORY":
      case "AGENCY.DEFINITION":
      case "AGENCY.AGENT":
        return true;
      default: return false;
    }
  }
  private boolean validObjectDataStructure(Map<String, Object> data, String type) {
    Set<String> keys = data.keySet();

    switch(type) {
      case "AGENCY.CATEGORY":
        if(keys.containsAll(AgentCategory.getKeySet())
        		&& keys.size() == AgentCategory.getKeySet().size()) return true;
        else return false;
      case "AGENCY.DEFINITION":
        if(keys.containsAll(AgentDefinition.getKeySet())
        		&& keys.size() == AgentDefinition.getKeySet().size()) return true;
        else return false;
      case "AGENCY.AGENT":
        if(keys.containsAll(AgentObject.getKeySet())
        		&& keys.size() == AgentObject.getKeySet().size()) return true;
        else return false;
      default: return false;

    }
  }


  public static String validBehavior(Object behavior_object) throws ServiceErrorException{
    switch(behavior_object.toString()){
      case "STRUCTURAL": return "STRUCTURAL";
      case "ACTOR": return "ACTOR";
      default: throw new ServiceErrorException("unknown agent category behavior");
    }
  }

  @SuppressWarnings("unchecked")
  public static Map<String, String> validDataStruct(Object data_struct) throws ServiceErrorException{

    //the value of each label should be something like: string-30, date-mm/dd/yy, int-9, (data type)-(format or length)
    //should use RegExp's for this eventually, but for now just stick to some basics
    Map<String, String> validated_structure = new HashMap<String, String>();
    Map<String, Object> data_map = null;

    if(data_struct instanceof Map) data_map = (Map<String, Object>) data_struct;
    else throw new ServiceErrorException("invalid data structure");

    for(String key: data_map.keySet()) { AgencyValidator.validLabel(key); }

    for(Object value: data_map.values()){
      switch(value.toString()){
        case "string-30": break;
        case "date-mm/dd/yy": break;
        case "string-any": break;
        default: throw new ServiceErrorException("unsupported value in data structure");
      }
    }
    data_map.forEach((key, value) -> {
      validated_structure.put(key, value.toString());
    });


    return validated_structure;
  }
}
