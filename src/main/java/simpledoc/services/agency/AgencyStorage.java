package simpledoc.services.agency;

import java.sql.Array;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Properties;
import java.util.UUID;

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
		CallableStatement cs = null;
	
		try {
			connection.setAutoCommit(false);

			for(ModuleObject object : data) {
				String type = object.getModuleObjectType();

				if(type.equalsIgnoreCase("AGENCY.CATEGORY"))			
					cs = setAgentCategoryCall(connection, (AgentCategory) object, "call agency.create_category(?,?,?,?,?)");
				else if(type.equalsIgnoreCase("AGENCY.DEFINITION"))
					cs = setAgentDefinitionCall(connection, (AgentDefinition) object, "call agency.create_definition(?,?,?,?,?)");
				else if(type.equalsIgnoreCase("AGENCY.AGENT"))
					cs = setAgentCall(connection, (AgentObject) object, "call agency.create_agent(?,?,?,?,?)");
				
				int result = cs.executeUpdate();
				if(result < 0) {
					committed = false;
					break;
				}
			};

			if (committed) connection.commit();
			else connection.rollback();


		} catch (SQLException e1) {
			committed = false;
			e1.printStackTrace();
		}

		return committed;
	}




	@Override
	public boolean update(List<ModuleObject> input) {
		// TODO: build after create() and query() working 
		return false;
	}



	@Override
	public boolean delete(List<ModuleObject> input) {
		// TODO: build after create() and query() working 
		return false;
	}



	@Override
	public List<Object> query(List<String> resource_path, List<String> query) {
		CallableStatement cs = null;
		ResultSet results = null;
		String resource = "";
		boolean is_uuid;
		
		
		String last_path_item = resource_path.get(resource_path.size() -1 );
		try { UUID.fromString(last_path_item); is_uuid = true; }
		catch(Exception e) { is_uuid = false; }
		if(is_uuid) resource = "single";
		else resource = "collection";
		
		
		try {
			if(resource.equalsIgnoreCase("single"))
				cs = setQueryCall(connection, resource_path, query, "call query_single_resource(?, ?)");
			else if(resource.equalsIgnoreCase("collection"))
				cs = setQueryCall(connection, resource_path, query, "call query_resource_collection(?, ?)");
			

			results = cs.executeQuery();
			//TODO: finish handling results

		} catch (SQLException e) {e.printStackTrace();}

		
		return null;
	}


	
	private CallableStatement setQueryCall(Connection connection, List<String> resource_path, List<String> query, String call) throws SQLException {
		CallableStatement cs = connection.prepareCall(call);
		cs.setArray(1, Array.class.cast(resource_path));
		cs.setArray(2, Array.class.cast(query));	
		
		return cs;
	}




	private CallableStatement setAgentCategoryCall(Connection connection, AgentCategory category, String call) throws SQLException {
		CallableStatement cs = connection.prepareCall(call);
		cs.setString(1, category.getId());
		cs.setString(2, category.getCategoryLabel());
		cs.setString(3, category.getCategoryBehavior());
		cs.setString(4, category.getCategorySecurity());
		cs.setString(5, category.getDataDefinition().toString());
		
		return cs;
	}
	
	
	
	private CallableStatement setAgentDefinitionCall(Connection connection, AgentDefinition definition, String call) throws SQLException {
		CallableStatement cs = connection.prepareCall(call);
		cs.setString(1, definition.getId());
		cs.setString(2, definition.getDefinitionLabel());
		cs.setString(3, definition.getCategoryId());
		cs.setString(4, definition.getDefinitionSecurity());
		cs.setString(5, definition.getDataDefinition().toString());
		
		return cs;
	}
	
	
	
	private CallableStatement setAgentCall(Connection connection, AgentObject agent, String call) throws SQLException {
		CallableStatement cs = connection.prepareCall(call);
		cs.setString(1, agent.getId());
		cs.setString(2, agent.getAgentLinkId());
		cs.setString(3, agent.getAgentSecurity());
		cs.setString(4, agent.getAgentDataStructure().toString());
		cs.setString(5, agent.getAgentData().toString());
		
		return cs;
	}
}
