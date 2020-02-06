package simpledoc.services.agency;

import java.sql.SQLException;
import java.util.HashSet;
import java.util.UUID;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectData;
import simpledoc.services.ModuleObjectFactory;


public class AgencyFactory<T extends ModuleObject> implements ModuleObjectFactory<T> {

	@Override
	@SuppressWarnings("unchecked")
	public T build(ModuleObjectData item) throws ServiceErrorException, SQLException {
		UUID id = getUUID(item.getIdString());
		String type = item.getType();

		switch(type){
			case "structuralNode":
			case "AGENCY.STRUCTURALNODE": return (T) new StructuralNode(id, type, item.getObjectData());
			case "agentTemplate":
			case "AGENCY.AGENTTEMPLATE": return (T) new AgentTemplate(id, type, item.getObjectData());
			case "agent":
			case "AGENCY.AGENT": return (T) new Agent(id, type, item.getObjectData());
			case "dataTag":
			case "AGENCY.DATATAG": return (T) new DataTag(id, type, item.getObjectData());
			case "user":
			case "AGENCY.USER": return (T) new User(id, type, item.getObjectData());
			case "assignment":
			case "AGENCY.ASSIGNMENT": return (T) new Assignment(id, type, item.getObjectData());
			case "role":
			case "AGENCY.ROLE": return (T) new Role(id, type, item.getObjectData());
			case "property":
			case "AGENCY.PROPERTY": return (T) new Property(id, type, item.getObjectData());
			default: throw new ServiceErrorException("invalid Agency Object Type sent to factory: "+type);
		}
	}

	@Override
	@SuppressWarnings("unchecked")
	public T build(String id_string, String type) throws ServiceErrorException {
		UUID id = getUUID(id_string);
		
		switch(type){
		case "structuralNode":
		case "AGENCY.STRUCTURALNODE": return (T) new StructuralNode(id, type);
		case "agentTemplate":
		case "AGENCY.AGENTTEMPLATE": return (T) new AgentTemplate(id, type);
		case "agent":
		case "AGENCY.AGENT": return (T) new Agent(id, type);
		case "dataTag":
		case "AGENCY.DATATAG": return (T) new DataTag(id, type);
		case "user":
		case "AGENCY.USER": return (T) new User(id, type);
		case "assignment":
		case "AGENCY.ASSIGNMENT": return (T) new Assignment(id, type);
		case "role":
		case "AGENCY.ROLE": return (T) new Role(id, type);
		case "property":
		case "AGENCY.PROPERTY": return (T) new Property(id, type);
		default: throw new ServiceErrorException("invalid Agency Object Type sent to factory: " + type);
	}	}

	private UUID getUUID(String id_string) throws ServiceErrorException {
		if(id_string.equalsIgnoreCase("new_object")) return UUID.randomUUID();
		else if(AgencyValidator.validateUUIDString(id_string)) return UUID.fromString(id_string);
		else throw new ServiceErrorException("invalid UUID sent to factory");
	}
	
	@Override
	public HashSet<String> getTypeSet() {
		HashSet<String> types = new HashSet<String>();
		types.add("agent");
		types.add("agentTemplate");
		types.add("structuralNode");
		types.add("user");
		types.add("dataTag");
		types.add("assignment");
		types.add("role");
		types.add("property");
		
		return types;
	}
	
	
	@Override
	public String getStorageCall(String call, String type, String id) {
	  switch(call) {
		case "delete":
		  if(type.equals("AGENCY.AGENT")) return "delete from agency.agent where id='" + id + "'";
		  else if(type.equals("AGENCY.AGENTTEMPLATE")) return "delete from agency.agenttemplate where id='" + id + "'";
		  else if(type.equals("AGENCY.STRUCTURALNODE")) return "delete from agency.structualnode where id='" + id + "'";
		  else if(type.equals("AGENCY.DATATAG")) return "delete from agency.datatag where id='" + id + "'";
		  else if(type.equals("AGENCY.USER")) return "delete from agency.user where id='" + id + "'";
		  else if(type.equals("AGENCY.ASSIGNMENT")) return "delete from agency.assignment where id='" + id + "'";
		  else if(type.equals("AGENCY.ROLE")) return "delete from agency.role where id='" + id + "'";
		  else if(type.equals("AGENCY.PROPERTY")) return "delete from agency.property where id='" + id + "'";
		  else return null;
		case "queryResource":
		  if(type.equals("agent")) return "select * FROM agency.query_agent_resource(?)"; 
		  else if(type.equals("agentTemplate")) return "select * FROM agency.query_agentTemplate_resource(?)";
		  else if(type.equals("structuralNode")) return "select * FROM agency.query_structuralNode_resource(?)";
		  else if(type.equals("dataTag")) return "select * FROM agency.query_dataTag_resource(?)"; 
		  else if(type.equals("user")) return "select * FROM agency.query_user_resource(?)"; 
		  else if(type.equals("assignment")) return "select * FROM agency.query_assignment_resource(?)"; 
		  else if(type.equals("role")) return "select * FROM agency.query_role_resource(?)"; 
		  else if(type.equals("property")) return "select * FROM agency.query_property_resource(?)"; 
		  else return null;
		case "queryCollection":
		  if(type.equals("agent")) return "select * FROM agency.query_agent_collection(?,?,?)"; 
		  else if(type.equals("agentTemplate")) return "select * FROM agency.query_agentTemplate_collection(?,?,?)";
		  else if(type.equals("structuralNode")) return "select * FROM agency.query_structuralNode_collection(?,?,?)";
		  else if(type.equals("dataTag")) return "select * FROM agency.query_dataTag_collection(?,?,?)"; 
		  else if(type.equals("user")) return "select * FROM agency.query_user_collection(?,?,?)"; 
		  else if(type.equals("assignment")) return "select * FROM agency.query_assignment_collection(?,?,?)"; 
		  else if(type.equals("role")) return "select * FROM agency.query_role_collection(?,?,?)"; 
		  else if(type.equals("property")) return "select * FROM agency.query_property_collection(?,?,?)"; 
		  else return null;
		default: return null;
	  }
	}
}
