package simpledoc.services.agency;

import java.util.UUID;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectData;
import simpledoc.services.ModuleObjectFactory;


public class AgencyFactory<T extends ModuleObject> implements ModuleObjectFactory<T> {

	@SuppressWarnings("unchecked")
	public T build(ModuleObjectData item) throws ServiceErrorException {
		UUID id = getUUID(item.getIdString());
		String type = item.getType();

		switch(type){
			case "AGENCY.STRUCTURALNODE":
				StructuralNode newStructuralNode = new StructuralNode(id, type, item.getObjectData());
				if(newStructuralNode instanceof ModuleObject) return (T)newStructuralNode;
			case "AGENCY.AGENTTEMPLATE":
				AgentTemplate newAgentTemplate = new AgentTemplate(id, type, item.getObjectData());
				if(newAgentTemplate instanceof ModuleObject) return (T)newAgentTemplate;
			case "AGENCY.AGENT":
				Agent newAgent = new Agent(id, type, item.getObjectData());
				if(newAgent instanceof ModuleObject) return (T)newAgent;
			case "AGENCY.DATATAG":
				DataTag newDataTag = new DataTag(id, type, item.getObjectData());
				if(newDataTag instanceof ModuleObject) return (T)newDataTag;
			case "AGENCY.USER":
				User newUser = new User(id, type, item.getObjectData());
				if(newUser instanceof ModuleObject) return (T)newUser;
			default:
				throw new ServiceErrorException("invalid Agency Object Type sent to factory");
		}
	}

	@SuppressWarnings("unchecked")
	public T build(String id_string, String type) throws ServiceErrorException {
		UUID id = getUUID(id_string);
		
		switch(type){
		case "AGENCY.STRUCTURALNODE":
			return (T) new StructuralNode(id, type);
		case "AGENCY.AGENTTEMPLATE":
			return (T) new AgentTemplate(id, type);
		case "AGENCY.AGENT":
			return (T) new Agent(id, type);
		case "AGENCY.DATATAG":
			return (T) new DataTag(id, type);
		case "AGENCY.USER":
			return (T) new User(id, type);
		default:
			throw new ServiceErrorException("invalid Agency Object Type sent to factory");
	}	}

	private UUID getUUID(String id_string) throws ServiceErrorException {
		if(id_string.equalsIgnoreCase("new_object")) return UUID.randomUUID();
		else if(AgencyValidator.validateUUIDString(id_string)) return UUID.fromString(id_string);
		else throw new ServiceErrorException("invalid UUID sent to factory");
	}
}
