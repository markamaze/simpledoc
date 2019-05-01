package simpledoc.services.agency;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.HashMap;
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
		String stored_procedure = "{? = call AGENCY.CREATE_AGENCY_OBJECTS(?)}";
	
		try {
			connection.setAutoCommit(false);


			 Map<String, Class<?>> type_map = new HashMap<>();


			type_map.put("AGENCY.AGENCY_AGENT", AgencyObject.class);
			type_map.put("AGENCY.AGENCY_DEFINITION", AgentDefObject.class);
			type_map.put("AGENCY.AGENCY_CATEGORY", AgentCategoryObject.class);
			connection.setTypeMap(type_map);
			
			CallableStatement ps = connection.prepareCall(stored_procedure);
	
			for(ModuleObject object : data) {
				String type = object.getModuleObjectType();

				if(type.equalsIgnoreCase("AGENCY_AGENT"))
					ps.setObject(1, (AgencyObject) object, Types.OTHER);
				else if(type.equalsIgnoreCase("AGENCY_DEFINITION"))
					ps.setObject(1, (AgentDefObject) object, Types.OTHER);
				else if(type.equalsIgnoreCase("AGENCY_CATEGORY"))
					ps.setObject(1, (AgentCategoryObject) object, Types.OTHER);

				ps.registerOutParameter(2, Types.BOOLEAN);

				ps.addBatch();
			};
			int[] result = ps.executeBatch();

			for(int i: result) { if (i < 0) committed = false; };

			if (committed) connection.commit();
			else connection.rollback();

			// END COMMENTED OUT CODE FOR DEBUGGING

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
