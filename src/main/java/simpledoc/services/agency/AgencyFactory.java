package simpledoc.services.agency;

import java.sql.SQLException;
import java.util.HashSet;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectData;
import simpledoc.services.ModuleObjectFactory;


public class AgencyFactory<T extends ModuleObject> implements ModuleObjectFactory<T> {

	@Override
	@SuppressWarnings("unchecked")
	public T build(ModuleObjectData item) throws ServiceErrorException, SQLException {
		String id = item.getIdString();
		String type = item.getType();

		switch(type){
			case "node":
			case "AGENCY.NODE": return (T) new Node(id, type, item.getObjectData());
			case "role":
			case "AGENCY.ROLE": return (T) new Role(id, type, item.getObjectData());
			case "agent":
			case "AGENCY.AGENT": return (T) new Agent(id, type, item.getObjectData());
			case "tag":
			case "AGENCY.TAG": return (T) new Tag(id, type, item.getObjectData());
			case "user":
			case "AGENCY.USER": return (T) new User(id, type, item.getObjectData());

			default: throw new ServiceErrorException("invalid Agency Object Type sent to factory: "+type);
		}
	}

	@Override
	@SuppressWarnings("unchecked")
	public T build(String id_string, String type) throws ServiceErrorException {
		switch(type){
			case "node":
			case "AGENCY.NODE": return (T) new Node(id_string, type);
			case "role":
			case "AGENCY.ROLE": return (T) new Role(id_string, type);
			case "agent":
			case "AGENCY.AGENT": return (T) new Agent(id_string, type);
			case "tag":
			case "AGENCY.TAG": return (T) new Tag(id_string, type);
			case "user":
			case "AGENCY.USER": return (T) new User(id_string, type);
			default: throw new ServiceErrorException("invalid Agency Object Type sent to factory: " + type);
		}	
	}

	
	@Override
	public HashSet<String> getTypeSet() {
		HashSet<String> types = new HashSet<String>();
		types.add("agent");
		types.add("role");
		types.add("node");
		types.add("user");
		types.add("tag");
		
		return types;
	}
	
	
	@Override
	public String getStorageCall(String call, String type, String id) {
	  switch(call) {
		case "delete":
		  if(type.equals("AGENCY.AGENT")) return "delete from agency.agent where id='" + id + "'";
		  else if(type.equals("AGENCY.ROLE")) return "delete from agency.role where id='" + id + "'";
		  else if(type.equals("AGENCY.NODE")) return "delete from agency.node where id='" + id + "'";
		  else if(type.equals("AGENCY.TAG")) return "delete from agency.tag where id='" + id + "'";
		  else if(type.equals("AGENCY.USER")) return "delete from agency.user where id='" + id + "'";
		  else return null;
		case "queryResource":
		  if(type.equals("agent")) return "select * FROM agency.query_agent_resource(?)"; 
		  else if(type.equals("role")) return "select * FROM agency.query_role_resource(?)";
		  else if(type.equals("node")) return "select * FROM agency.query_node_resource(?)";
		  else if(type.equals("tag")) return "select * FROM agency.query_tag_resource(?)"; 
		  else if(type.equals("user")) return "select * FROM agency.query_user_resource(?)"; 
		  else return null;
		case "queryCollection":
		  if(type.equals("agent")) return "select * FROM agency.query_agent_collection(?,?,?)"; 
		  else if(type.equals("role")) return "select * FROM agency.query_role_collection(?,?,?)";
		  else if(type.equals("node")) return "select * FROM agency.query_node_collection(?,?,?)";
		  else if(type.equals("tag")) return "select * FROM agency.query_tag_collection(?,?,?)"; 
		  else if(type.equals("user")) return "select * FROM agency.query_user_collection(?,?,?)"; 
		  else return null;
		default: return null;
	  }
	}
}
