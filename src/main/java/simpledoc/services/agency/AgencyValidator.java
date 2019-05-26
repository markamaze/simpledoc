package simpledoc.services.agency;

import java.util.Collections;
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

    //TODO: finish validateRequest to include validation with method & resource


    //in addition to below verification,
    //  make sure the resource/method/data make sense

    //  for example, a POST or PUT method with any resorce other than "/Agency" wouldn't be supported for now
    //              a GET or DELETE method with a request body wouldn't be supported
    //              giving a valid id on a POST request wouldn't make sense
    //              not giving a valid id on a PUT request wouldn't make sense
    //

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
        if(keys.containsAll(AgentCategory.getKeySet())) return true;
        else return false;
      case "AGENCY.DEFINITION":
        if(keys.containsAll(AgentDefinition.getKeySet())) return true;
        else return false;
      case "AGENCY.AGENT":
        if(keys.containsAll(AgentObject.getKeySet())) return true;
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
    //should check that each label is valid
    //the value of each label should be something like: string-30, date-mm/dd/yy, int-9, (data type)-(format or length)
    //should use RegExp's for this eventually, but for now just stick to some basics
    Map<String, String> validated_structure = Collections.emptyMap();
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
