package simpledoc.services.agency;

import java.util.Properties;
import java.net.URI;
import java.sql.SQLException;
import simpledoc.exceptions.StorageErrorException;
import java.util.UUID;
import java.util.HashSet;
import java.util.Set;
import java.sql.Array;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.Map;
import java.util.List;
import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectStorage;


public class AgencyStorage implements ModuleObjectStorage {
	//TODO: remove credientials, use environment variables
	private static Connection connection;

	public AgencyStorage() throws StorageErrorException {
		try {
				// String database_url_string = "jdbc:postgresql://ec2-54-243-197-120.compute-1.amazonaws.com:5432/da16p9r5cqnbfj?user=pqtafaszpcncjx&password=fdfa9f7f87e9bba343a3c303b7c6dae39006a5adbc4345e535fb0b3f16340904&sslmode=require";

				Class.forName("org.postgresql.Driver");
				String database_url_string = System.getenv("JDBC_DATABASE_URL");
				connection = DriverManager.getConnection(database_url_string);

		}
		catch (SQLException err) {
			err.printStackTrace();
			throw new StorageErrorException("error connecting to database");
		}
		// catch (URISyntaxException err) { throw new StorageErrorException("error with database uri"); }
		catch (Exception err) { err.printStackTrace(); }
		}




	@Override
	public boolean create(Set<ModuleObject> data) throws StorageErrorException {
		Boolean committed = true;

		try {
			connection.setAutoCommit(false);

			for(ModuleObject object : data) {
				CallableStatement cs = setCreateStatement(connection, object);
				int result = cs.executeUpdate();
				if(result < 0) {
					committed = false;
					break;
				}
			};

			if (committed) connection.commit();
			else {
				connection.rollback();
				throw new StorageErrorException("error with commiting data to database");
			}

		} catch (SQLException e) {
			committed = false;
			throw new StorageErrorException("error storing new objects in database");
		}

		return committed;
	}
	private CallableStatement setCreateStatement(Connection conn, ModuleObject object) throws SQLException {
		CallableStatement cs = null;
		String type = object.getModuleObjectType();

		if(type.equalsIgnoreCase("AGENCY.CATEGORY")){
			AgentCategory category = (AgentCategory) object;
			cs = conn.prepareCall("call agency.create_category(?,?,?,?,?)");
			cs.setObject(1, category.getId());
			cs.setString(2, category.getCategoryLabel());
			cs.setString(3, category.getCategoryBehavior());
			cs.setString(4, category.getCategorySecurity());
			cs.setString(5, category.getDataDefinition().toString());
		}
		else if(type.equalsIgnoreCase("AGENCY.DEFINITION")){
			AgentDefinition definition = (AgentDefinition) object;
			cs = conn.prepareCall("call agency.create_definition(?,?,?,?,?)");
			cs.setObject(1, definition.getId());
			cs.setString(2, definition.getDefinitionLabel());
			cs.setObject(3, definition.getCategoryId());
			cs.setString(4, definition.getDefinitionSecurity());
			cs.setString(5, definition.getDataDefinition().toString());
		}
		else if(type.equalsIgnoreCase("AGENCY.AGENT")){
			AgentObject agent = (AgentObject) object;
			cs = conn.prepareCall("call agency.create_agent(?,?,?,?,?,?)");
			cs.setObject(1, agent.getId());
			cs.setObject(2, agent.getAgentLinkId());
			cs.setObject(3, agent.getDefinitionId());
			cs.setString(4, agent.getAgentSecurity());
			cs.setString(5, agent.getAgentDataStructure().toString());
			cs.setString(6, agent.getAgentData().toString());
		}

		return cs;
	}




	@Override
	public boolean update(Set<ModuleObject> input) throws StorageErrorException {
		// TODO: build after create() and query() working
		return false;
	}



	@Override
	public boolean delete(Map<String, UUID> delete_set) throws StorageErrorException {
		// TODO: build after create() and query() working
		return false;
	}



	@Override
	public Set<String[]> query(List<String> resource_path, Map<String, String> query) throws StorageErrorException {
		Set<String[]> returnable_result = new HashSet<String[]>();

		try{
			String call = setQueryCall(resource_path);
			CallableStatement cs = connection.prepareCall(call);
			cs.setArray(1, connection.createArrayOf("text", resource_path.toArray()));
			cs.setArray(2, connection.createArrayOf("text", query.keySet().toArray()));
			cs.setArray(3, connection.createArrayOf("text", query.values().toArray()));
			ResultSet storage_result = cs.executeQuery();

			while(storage_result.next()) {
				Array result = storage_result.getArray(1);
				String[] result_set = result.toString().split(",");
				returnable_result.add(result_set);
			}
		} catch(SQLException e){ throw new StorageErrorException("error with database query"); }



		return returnable_result;
	}
	private String setQueryCall(List<String> resource_path) throws StorageErrorException {
		String call = "";
		String resource_switch = resource_path.toString();

		switch(resource_switch){
			case "[Agency, categories]":
				call = "select agency.query_category_collection(?,?,?)";
				break;
			case "[Agency, definitions]":
				call = "select agency.query_definition_collection(?,?,?)";
				break;
			case "[Agency, agents]":
				call = "select agency.query_agent_collection(?,?,?)";
				break;
			default:
				throw new StorageErrorException("invalid resource request");
		}

		return call;
	}

}
