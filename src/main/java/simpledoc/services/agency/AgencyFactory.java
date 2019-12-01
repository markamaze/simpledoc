package simpledoc.services.agency;

import java.util.Map;
import java.util.UUID;
import simpledoc.RequestData;
import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectFactory;


public class AgencyFactory implements ModuleObjectFactory {

	public ModuleObject build(RequestData data_item) throws ServiceErrorException{
		UUID id;
		try {
			if(data_item.getIdString().equalsIgnoreCase("new_object")) id = UUID.randomUUID();
			else id = UUID.fromString(data_item.getIdString()); }
		catch(IllegalArgumentException err) {throw new ServiceErrorException("invalid UUID sent to factory");}
		Map<String, Object> data = data_item.getObjectData();
		String type = data_item.getType();

		switch(type){
			case "AGENCY.STRUCTURALNODE":
				return new StructuralNode(id, type, data);
			case "AGENCY.AGENTTEMPLATE":
				return new AgentTemplate(id, type, data);
			case "AGENCY.AGENT":
				return new Agent(id, type, data);
			case "AGENCY.DATATAG":
				return new DataTag(id, type, data);
			case "AGENCY.USER":
				return new User(id, type, data);
			// case "AGENCY.AGENT":
			// 	return new AgentObject(id, type, data);
			// case "AGENCY.DEFINITION":
			// 	return new AgentDefinition(id, type, data);
			// case "AGENCY.CATEGORY":
			// 	return new AgentCategory(id, type, data);
			default:
				throw new ServiceErrorException("invalid Agency Object Type sent to factory");
		}
	}

}
