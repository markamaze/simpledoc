package simpledoc.services.agency;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;
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
		CallableStatement cs = null;
	
		try {
			connection.setAutoCommit(false);

			for(ModuleObject object : data) {
				String type = object.getModuleObjectType();

				if(type.equalsIgnoreCase("AGENCY.CATEGORY"))			
					cs = setAgencyCategory(connection, (AgentCategory) object);
				else if(type.equalsIgnoreCase("AGENCY.DEFINITION"))
					cs = setAgencyDefinition(connection, (AgentDefinition) object);
				else if(type.equalsIgnoreCase("AGENCY.AGENT"))
					cs = setAgent(connection, (AgentObject) object);
				
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
		// TODO Auto-generated method stub
		return false;
	}



	@Override
	public boolean delete(List<ModuleObject> input) {
		// TODO Auto-generated method stub
		return false;
	}



	@Override
	public List<ModuleObject> query(List<String> input) {
		// TODO Auto-generated method stub
		return null;
	}



}
