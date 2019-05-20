package simpledoc.services.agency;

import simpledoc.ResourceRequest;
import simpledoc.ResourceResponse;
import java.util.Set;
import java.util.Map;
import java.util.List;
import simpledoc.services.ModuleValidation;
import simpledoc.utilities.ValidationObject;



public class AgencyValidator extends ModuleValidation {

  @Override
  public ValidationObject validateModuleObjectType(String type){
    // boolean valid_object_type;
    // if(type.equalsIgnoreCase("AGENCY.OBJECT")
    //     || type.equalsIgnoreCase("AGENCY.CATEGORY")
    //     || type.equalsIgnoreCase("AGENCY.DEFINITION")) valid_object_type = true;
    // else valid_object_type = false;
    //
    // if(valid_object_type){getEntrySetValue
    //   ValidationObject();
    //   //create empty ValidationObject and set the value and isValid=true
    // } else /*create empty validation object and set isValid=false*/


    return null;
  }

  @Override
  public ValidationObject validateModuleObjectData(Object object_data, String object_type) {

    ValidationObject validated_map = new ValidationObject(object_data, Map.class);
    ValidationObject validated_data = null;

    if(validated_map.isValid()){

      switch(object_type){
        case "AGENCY.OBJECT":
          validated_data = AgentObject.validateData(validated_map.getMapValue());
          break;

        case "AGENCY.DEFINITION":
          validated_data = AgentDefinition.validateData(validated_map.getMapValue());
          break;

        case "AGENCY.CATEGORY":
          validated_data = AgentCategory.validateData(validated_map.getMapValue());
          break;

      }
    }
    if(validated_data.isValid()){
      return validated_map;
    }
  }

  public ValidationObject validateSupportedRequest(ResourceRequest request){
    //check
    return null;
  }
  public ValidationObject validateSupportedResponse(ResourceResponse response){
    ValidationObject validated_response = null;


    return validated_response;
  }

}
