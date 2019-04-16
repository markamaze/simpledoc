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

// rebuild Agency Storage class using direct sql statements I suppose.
// having trouble with UDT types and SQL functions
// ignore acid requirements for now, just get it so I can use the database from the client.

public class AgencyStorage_rebuild implements ModuleObjectStorage {
	
	private static Connection connection;
	private static String url = "jdbc:postgresql://localhost:5432/simpledoc";
	
	
	
	public AgencyStorage_rebuild() {
		try {
			Properties props = new Properties();
			props.setProperty("user", "mark");
			connection = DriverManager.getConnection(url, props);
		} catch (SQLException err) { err.printStackTrace();	}	}

	//redesign my sql tables such that all 3 agency object types
	//  (Agent, Definition, Category)
	//are stored in the same table. That would simplify 
	

	@Override
	public boolean create(List<ModuleObject> data) {
		Boolean committed = true;
		String stored_procedure;
		PreparedStatement ps = null;
		
		try {			
			connection.setAutoCommit(false);
			

			int[] result = ps.executeBatch();

			for(int i: result) { if (i < 0) committed = false; };
			
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
