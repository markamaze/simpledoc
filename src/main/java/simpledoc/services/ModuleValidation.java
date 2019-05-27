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
      UUID uuid = null;
      try{
        uuid = UUID.fromString(id_string.toString());
      } catch (IllegalArgumentException err) { throw new ServiceErrorException("invalid id given"); }
      return uuid;
    }

    public static String validLabel(Object label_object) throws ServiceErrorException{
      String label = label_object.toString();

      if(label.length() > 30) throw new ServiceErrorException("invalid label, too many characters");

      return label;
    }

    public static String validSecurity(Object security_object) throws ServiceErrorException{
      char[] security = security_object.toString().toCharArray();

      if(security.length != 4) throw new ServiceErrorException("invalid security value, must be 4 digits");
      for(char i: security ){
        Integer asint = Integer.parseInt(Character.toString(i));
        if(asint < 1 || asint > 4) throw new ServiceErrorException("invalid security digit, out of bounds");
      }
      return security_object.toString();
    }

}
