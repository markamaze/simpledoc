package simpledoc.services.agency;

import simpledoc.utilities.ValidationObject;
import java.util.Map;
import java.util.UUID;
import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectFactory;


public class AgencyFactory implements ModuleObjectFactory {

	public ModuleObject build(Object data_item) {
		AgencyValidator validator = new AgencyValidator();
		ValidationObject id = validator.validateObject(data_item.get("id"), UUID.class);
		ValidationObject type = validator.validateModuleObjectType(data_item.get("type").toString());

		if(id.isValid() && type.isValid()){

			//this should just make sure that the object_data contains the proper keyset of the given type
			ValidationObject object_data = validator.validateModuleObjectData(data_item.get("object_data"), type.getStringValue());

			if(object_data.isValid()) {
				switch(type.getStringValue()){
					case "AGENCY.AGENT":
						return new AgentObject(id.getUUIDValue(), type.getStringValue(), object_data.getMapValue());
					case "AGENCY.DEFINITION":
						return new AgentDefinition(id.getUUIDValue(), type.getStringValue(), object_data.getMapValue());
					case "AGENCY.CATEGORY":
						return new AgentCategory(id.getUUIDValue(), type.getStringValue(), object_data.getMapValue());
				}
			}
		}

		return null;
	}

}
