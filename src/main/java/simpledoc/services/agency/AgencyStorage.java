package simpledoc.services.agency;

import java.sql.Array;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectStorage;



public class AgencyStorage implements ModuleObjectStorage {

	private static Connection connection;
	private static String url = "jdbc:postgresql://ec2-54-243-197-120.compute-1.amazonaws.com:5432/da16p9r5cqnbfj";
	private static String username = "pqtafaszpcncjx";
	private static String password = "fdfa9f7f87e9bba343a3c303b7c6dae39006a5adbc4345e535fb0b3f16340904";


	public AgencyStorage() {
		try {
			Properties props = new Properties();
			props.setProperty("user", username);
			props.setProperty("password", password);
			connection = DriverManager.getConnection(url, props);
		} catch (SQLException err) { err.printStackTrace();	}	}




	@Override
	public boolean create(List<ModuleObject> data) {
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
			else connection.rollback();


		} catch (SQLException e) {
			committed = false;
			e.printStackTrace();
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
	public boolean update(List<ModuleObject> input) {
		// TODO: build after create() and query() working
		return false;
	}



	@Override
	public boolean delete(List<Object> delete_set) {
		// TODO: build after create() and query() working
		return false;
	}



	@Override
	public List<String[]> query(List<String> resource_path, Map<String, String> query) {
		List<String[]> returnable_result = new ArrayList<String[]>();

		try{
			String call = setQueryCall(resource_path);
			CallableStatement cs = connection.prepareCall(call);
			cs.setArray(1, connection.createArrayOf("text", resource_path.toArray()));
			cs.setArray(2, connection.createArrayOf("text", query.keySet().toArray()));
			cs.setArray(3, connection.createArrayOf("text", query.values().toArray()));
			ResultSet storage_result = cs.executeQuery();

			while(storage_result.next()) {
				Array result = storage_result.getArray(1);
				String[] result_set = result.toString().substring(1).split(",");
				returnable_result.add(result_set);
			}
		} catch(SQLException e){ e.printStackTrace(); }


		return returnable_result;
	}
	private String setQueryCall(List<String> resource_path) {
		String call = "";
		String resource_switch = "";

		//somehow, set switch using resource_path

		switch(resource_switch){
			case "category_resource":
				call = "select agency.query_category_resource(?,?,?)";
				break;
			case "category_collection":
				call = "select agency.query_category_collection(?,?,?)";
				break;
			case "definition_resource":
				call = "select agency.query_definition_resource(?,?,?)";
				break;
			case "definition_collection":
				call = "select agency.query_definition_collection(?,?,?)";
				break;
			case "agent_resource":
				call = "select agency.query_agent_resource(?,?,?)";
				break;
			case "agent_collection":
				call = "select agency.query_agent_collection(?,?,?)";
				break;
			default:
				call = "select agency.query_category_collection(?,?,?)";
		}
		return call;
	}

}
