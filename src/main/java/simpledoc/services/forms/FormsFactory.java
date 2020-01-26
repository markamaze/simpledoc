package simpledoc.services.forms;

import java.util.Map;
import java.util.UUID;
import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectData;
import simpledoc.services.ModuleObjectFactory;



public class FormsFactory<T extends ModuleObject> implements ModuleObjectFactory<T> {

  @SuppressWarnings("unchecked")
  public T build(ModuleObjectData item) throws ServiceErrorException {
    UUID id = getUUID(item.getIdString());
    String type = item.getType();
    Map<String, Object> data = item.getObjectData();

    if(type == "FORMS.FORM") return (T) new Form(id, type, data);
    else if(type == "FORMS.SECTION") return (T) new Section(id, type, data);
    else if(type == "FORMS.LAYOUT") return (T) new Layout(id, type, data);
    else if(type == "FORMS.ELEMENT") return (T) new Element(id, type, data);
    else if(type == "FORMS.FORMSET") return (T) new FormSet(id, type, data);
    else if(type == "FORMS.SUBMISSION") return (T) new Submission(id, type, data);
    else throw new ServiceErrorException("invalid Forms Object type sent to factory");

  }

  @SuppressWarnings("unchecked")
  public T build(String id_string, String type) throws ServiceErrorException {
    UUID id = getUUID(id_string);

    if(type == "FORMS.FORM") return (T) new Form(id, type);
    else if(type == "FORMS.SECTION") return (T) new Section(id, type);
    else if(type == "FORMS.LAYOUT") return (T) new Layout(id, type);
    else if(type == "FORMS.ELEMENT") return (T) new Element(id, type);
    else if(type == "FORMS.FORMSET") return (T) new FormSet(id, type);
    else if(type == "FORMS.SUBMISSION") return (T) new Submission(id, type);
    else throw new ServiceErrorException("invalid Forms Object type sent to factory");

  }

  private UUID getUUID(String id_string) throws ServiceErrorException {
    if(id_string.equalsIgnoreCase("new_object")) return UUID.randomUUID();
    else if(FormsValidator.validateUUIDString(id_string)) return UUID.fromString(id_string);
    else throw new ServiceErrorException("invalid UUID sent to Forms factory");
  }
}
