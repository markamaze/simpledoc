package simpledoc.services.forms;

import java.sql.SQLException;
import java.util.HashSet;
import java.util.Map;
import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectData;
import simpledoc.services.ModuleObjectFactory;



public class FormsFactory<T extends ModuleObject> implements ModuleObjectFactory<T> {

  @Override
  @SuppressWarnings("unchecked")
  public T build(ModuleObjectData item) throws ServiceErrorException, SQLException {
    String id = item.getIdString();
    String type = item.getType();
    Map<String, Object> data = item.getObjectData();

    if(type.equals("FORMS.FORM")) return (T) new Form(id, type, data);
    else if(type.equals("FORMS.SECTION")) return (T) new Section(id, type, data);
    else if(type.equals("FORMS.LAYOUT")) return (T) new Layout(id, type, data);
    else if(type.equals("FORMS.ELEMENT")) return (T) new Element(id, type, data);
    else if(type.equals("FORMS.FORMSET")) return (T) new FormSet(id, type, data);
    else if(type.equals("FORMS.SUBMISSION")) return (T) new Submission(id, type, data);
    else throw new ServiceErrorException("invalid Forms Object type sent to factory");

  }

  @Override
  @SuppressWarnings("unchecked")
  public T build(String id_string, String type) throws ServiceErrorException {
    if(type.equals("FORMS.FORM") || type.equals("form")) return (T) new Form(id_string, type);
    else if(type.equals("FORMS.SECTION") || type.equals("section")) return (T) new Section(id_string, type);
    else if(type.equals("FORMS.LAYOUT") || type.equals("layout")) return (T) new Layout(id_string, type);
    else if(type.equals("FORMS.ELEMENT") || type.equals("element")) return (T) new Element(id_string, type);
    else if(type.equals("FORMS.FORMSET") || type.equals("formSet")) return (T) new FormSet(id_string, type);
    else if(type.equals("FORMS.SUBMISSION") || type.equals("submission")) return (T) new Submission(id_string, type);
    else throw new ServiceErrorException("invalid Forms Object type sent to factory");

  }

  
  @Override
  public String getStorageCall(String call, String type, String id) {
	switch(call) {
		case "delete":
			if(type.equals("FORMS.FORM")) return "delete from forms.forms where id='"+id+"'";
	    	else if(type.equals("FORMS.SECTION")) return "delete from forms.sections where id='"+id+"'";
	    	else if(type.equals("FORMS.LAYOUT")) return "delete from forms.layouts where id='"+id+"'";
	    	else if(type.equals("FORMS.ELEMENT")) return "delete from forms.elements where id='"+id+"'";
	    	else if(type.equals("FORMS.FORMSET")) return "delete from forms.formSets where id='"+id+"'";
	    	else if(type.equals("FORMS.SUBMISSION")) return "delete from forms.submissions where id='"+id+"'";
	    	else return null;
		case "queryResource":
			if(type.equals("form")) return "select * FROM forms.query_forms_resource(?)";
			else if(type.equals("section")) return "select * FROM forms.query_sections_resource(?)";
			else if(type.equals("layout")) return "select * FROM forms.query_layouts_resource(?)";
			else if(type.equals("element")) return "select * FROM forms.query_elements_resource(?)";
			else if(type.equals("formSet")) return "select * FROM forms.query_formSets_resource(?)";
			else if(type.equals("submission")) return "select * FROM forms.query_submissions_resource(?)";
			else return null;
		case "queryCollection":
			if(type.equals("form")) return "select * FROM forms.query_forms_collection(?,?,?)";
			else if(type.equals("section")) return "select * FROM forms.query_sections_collection(?,?,?)";
			else if(type.equals("layout")) return "select * FROM forms.query_layouts_collection(?,?,?)";
			else if(type.equals("element")) return "select * FROM forms.query_elements_collection(?,?,?)";
			else if(type.equals("formSet")) return "select * FROM forms.query_formSets_collection(?,?,?)";
			else if(type.equals("submission")) return "select * FROM forms.query_submissions_collection(?,?,?)";
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
