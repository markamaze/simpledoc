package simpledoc.services;

import java.util.UUID;
import simpledoc.exceptions.ServiceErrorException;
import simpledoc.exceptions.UnsupportedServiceRequest;
import java.util.List;
import simpledoc.RequestData;
import java.util.Set;


public abstract class ModuleValidation {

  public abstract boolean validateRequest(Set<RequestData> data, String method, List<String> resource)
    throws UnsupportedServiceRequest;


    public static UUID validUUIDString(Object id_string) throws ServiceErrorException{

      return null;
    }

    public static String validLabel(Object label_object) throws ServiceErrorException{

      return "";
    }

    public static String validSecurity(Object security_object) throws ServiceErrorException{

      return "";
    }

}
