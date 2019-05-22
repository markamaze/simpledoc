package simpledoc.services.agency;

import java.util.Map;
import java.util.UUID;
import simpledoc.RequestData;
import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectFactory;


public class AgencyFactory implements ModuleObjectFactory {

	//might be good to setup such that it is only capable of accepting validated data
	// currently I just only call it with data I know has been validated
	//for now just catch illegal arguments and throw ServiceErrorException
	public ModuleObject build(RequestData data_item) throws ServiceErrorException{
		UUID id;
		try {	id = UUID.fromString(data_item.getIdString()); }
		catch(IllegalArgumentException err) {throw new ServiceErrorException("invalid UUID sent to factory");}
		Map<String, Object> data = data_item.getObjectData();
		String type = data_item.getType();

		switch(type){
			case "AGENCY.AGENT":
				return new AgentObject(id, type, data);
			case "AGENCY.DEFINITION":
				return new AgentDefinition(id, type, data);
			case "AGENCY.CATEGORY":
				return new AgentCategory(id, type, data);
			default:
				throw new ServiceErrorException("invalid Agency Object Type sent to factory");
		}
	}

}
