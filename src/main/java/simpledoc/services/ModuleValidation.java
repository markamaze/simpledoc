package simpledoc.services;

import simpledoc.ResourceResponse;
import simpledoc.ResourceRequest;
import java.util.Set;
import simpledoc.utilities.ValidationObject;


public abstract class ModuleValidation {

  public ValidationObject validateSetAs(Set<?> object, Class<?> set_of){
    return new ValidationObject(object, set_of);
  }

  public ValidationObject validateObjectAs(Object object, Class<?> class_of) {

    return new ValidationObject(object, class_of);
  }

  public abstract ValidationObject validateModuleObjectType(String type);
  public abstract ValidationObject validateModuleObjectData(Object object_data, String object_type);


  //check that method and URL are supported, and body.data in expected form
  public abstract ValidationObject validateSupportedRequest(ResourceRequest request);


  //check that the response body and code are valid given the initial request signature
  public abstract ValidationObject validateSupportedResponse(ResourceResponse response);
}
