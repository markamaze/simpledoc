package simpledoc.services;

import simpledoc.exceptions.UnsupportedServiceRequest;
import java.util.List;
import simpledoc.RequestData;
import java.util.Set;


public abstract class ModuleValidation {

  public abstract boolean validateRequest(Set<RequestData> data, String method, List<String> resource)
    throws UnsupportedServiceRequest;
}
