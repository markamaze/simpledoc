package simpledoc.services.forms;

import java.sql.SQLException;
import java.util.HashSet;
import java.util.Map;
import java.util.UUID;
import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectData;
import simpledoc.services.ModuleObjectFactory;



public class FormsFactory<T extends ModuleObject> implements ModuleObjectFactory<T> {

  @Override
  @SuppressWarnings("unchecked")
  public T build(ModuleObjectData item) throws ServiceErrorException, SQLException {
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

  @Override
  @SuppressWarnings("unchecked")
  public T build(String id_string, String type) throws ServiceErrorException {
    UUID id = getUUID(id_string);

    if(type == "FORMS.FORM" || type == "form") return (T) new Form(id, type);
    else if(type == "FORMS.SECTION" || type == "section") return (T) new Section(id, type);
    else if(type == "FORMS.LAYOUT" || type == "layout") return (T) new Layout(id, type);
    else if(type == "FORMS.ELEMENT" || type == "element") return (T) new Element(id, type);
    else if(type == "FORMS.FORMSET" || type == "formSet") return (T) new FormSet(id, type);
    else if(type == "FORMS.SUBMISSION" || type == "submission") return (T) new Submission(id, type);
    else throw new ServiceErrorException("invalid Forms Object type sent to factory");

  }

  private UUID getUUID(String id_string) throws ServiceErrorException {
    if(id_string.equalsIgnoreCase("new_object")) return UUID.randomUUID();
    else if(FormsValidator.validateUUIDString(id_string)) return UUID.fromString(id_string);
    else throw new ServiceErrorException("invalid UUID sent to Forms factory");
  }
  
  @Override
  public String getStorageCall(String call, String type, String id) {
	switch(call) {
		case "delete":
			if(type == "FORMS.FORM") return "delete from forms.forms where id='"+id+"'";
	    	else if(type == "FORMS.SECTION") return "delete from forms.sections where id='"+id+"'";
	    	else if(type == "FORMS.LAYOUT") return "delete from forms.layouts where id='"+id+"'";
	    	else if(type == "FORMS.ELEMENT") return "delete from forms.elements where id='"+id+"'";
	    	else if(type == "FORMS.FORMSET") return "delete from forms.formSets where id='"+id+"'";
	    	else if(type == "FORMS.SUBMISSION") return "delete from forms.submissions where id='"+id+"'";
	    	else return null;
		case "queryResource":
			if(type == "form") return "select * FROM forms.query_forms_resource(?)";
			else if(type == "section") return "select * FROM forms.query_sections_resource(?)";
			else if(type == "layout") return "select * FROM forms.query_layouts_resource(?)";
			else if(type == "element") return "select * FROM forms.query_elements_resource(?)";
			else if(type == "formSet") return "select * FROM forms.query_formSets_resource(?)";
			else if(type == "submission") return "select * FROM forms.query_submissions_resource(?)";
			else return null;
		case "queryCollection":
			if(type == "form") return "select * FROM forms.query_forms_collection(?,?,?)";
			else if(type == "section") return "select * FROM forms.query_sections_collection(?,?,?)";
			else if(type == "layout") return "select * FROM forms.query_layouts_collection(?,?,?)";
			else if(type == "element") return "select * FROM forms.query_elements_collection(?,?,?)";
			else if(type == "formSet") return "select * FROM forms.query_formSets_collection(?,?,?)";
			else if(type == "submission") return "select * FROM forms.query_submissions_collection(?,?,?)";
			else return null;
		default: return null;
	}
  }

	@Override
	public HashSet<String> getTypeSet() {
		HashSet<String> types = new HashSet<String>();
		types.add("form");
		types.add("section");
		types.add("layout");
		types.add("element");
		types.add("formSet");
		types.add("submission");
		
		return types;
	}
}
