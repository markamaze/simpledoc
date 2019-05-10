package simpledoc.services.agency;

import simpledoc.utilities.ValidationHandler;
import java.util.Map;
import java.util.UUID;

import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectFactory;


public class AgencyFactory implements ModuleObjectFactory {


	public ModuleObject build(Map<String, Object> data_item) {
		UUID id = ValidationHandler.getValidUUIDFor("id", data_item);
		String type = ValidationHandler.getValidStringFor("type", data_item);
		Map<String, Object> object_data = ValidationHandler.getValidMapFor("object_data", data_item);

		if(type.equalsIgnoreCase("AGENCY.AGENT")) return new AgentObject(id, type, object_data);
		else if(type.equalsIgnoreCase("AGENCY.DEFINITION")) return new AgentDefinition(id, type, object_data);
		else if(type.equalsIgnoreCase("AGENCY.CATEGORY")) return new AgentCategory(id, type, object_data);
		else return null;
	}

}
