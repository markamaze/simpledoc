package simpledoc.services.agency;

import java.sql.SQLException;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.exceptions.StorageErrorException;
import java.util.UUID;

import java.util.HashSet;
import java.util.Set;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.List;
import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectStorage;


public class AgencyStorage<T extends ModuleObject> implements ModuleObjectStorage<T> {
	private static Connection connection;
	private AgencyFactory<T> factory;

	public AgencyStorage() throws StorageErrorException {
		factory = new AgencyFactory<T>();
		try {
				// String database_url_string = System.getenv("JDBC_DATABASE_URL");
				String database_url_string = "jdbc:postgresql://ec2-54-243-197-120.compute-1.amazonaws.com:5432/da16p9r5cqnbfj?user=pqtafaszpcncjx&password=fdfa9f7f87e9bba343a3c303b7c6dae39006a5adbc4345e535fb0b3f16340904&sslmode=require";

				connection = DriverManager.getConnection(database_url_string);

		}
		catch (SQLException err) {
			err.printStackTrace();
			throw new StorageErrorException("error connecting to database");
		}
	}



	@Override
	public boolean create(Set<T> data) throws StorageErrorException {
		Boolean committed = true;

		try {
			connection.setAutoCommit(false);

			for(T object : data) {
				PreparedStatement cs;
				try {
					cs = object.writeStorageStatement("create", connection);
					
					int result = cs.executeUpdate();
					if(result < 0) {
						committed = false;
						break;
					}
				} catch (ServiceErrorException e) {	e.printStackTrace(); }
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


	@Override
	public boolean update(Set<T> input) throws StorageErrorException {
		Boolean committed = true;
		
		try {
			connection.setAutoCommit(false);
			
			for(T obj : input) {
				PreparedStatement cs = obj.writeStorageStatement("update", connection);
				int result = cs.executeUpdate();
				if(result < 0) {
					committed = false;
					break;
				}
			}
			
			if (committed) connection.commit();
			else {
				connection.rollback();
				throw new StorageErrorException("error with commiting data to database");
			}
		} catch(SQLException err) {err.printStackTrace();
		} catch (ServiceErrorException e) {e.printStackTrace();}
		
		
		
		return true;
	}


	@Override
	public boolean delete(Map<String, UUID> delete_set) throws StorageErrorException {
		boolean committed = true;
		try {
			connection.setAutoCommit(false);
			for(Entry<String, UUID> entry : delete_set.entrySet()) {
				String type = entry.getKey();
				UUID id = entry.getValue();
				String call = null;
				
				switch(type) {
				case "AGENCY.AGENT":
					call = "delete from agency.agents where id='" + id + "'";
					break;
				case "AGENCY.AGENTTEMPLATE":
					call = "delete from agency.agenttemplates where id='" + id + "'";
					break;
				case "AGENCY.STRUCTURALNODE":
					call = "delete from agency.structualnodes where id='" + id + "'";
					break;
				case "AGENCY.DATATAG":
					call = "delete from agency.datatags where id='" + id + "'";
					break;
				case "AGENCY.USER":
					call = "delete from agency.users where id='" + id + "'";
					break;
				}
				
				PreparedStatement cs = connection.prepareStatement(call);
//				cs.setObject(1, id);
				int result = cs.executeUpdate();
				//returning 0 
				
				if(result < 1) {
					committed = false;
					break;
				}
			}
			
			if(committed) connection.commit();
			else {
				connection.rollback();
				throw new StorageErrorException("error deleting objects from database");
			}
		} catch(SQLException err) { throw new StorageErrorException("couldn't delete objects from database: " + err.getMessage()); }

		return committed;
	}

	
	@Override
	public T queryResource(List<String> resource_path, Map<String, String> query) throws StorageErrorException {
		T result = null;
		
		try{
			String call;
			String type;
			switch(resource_path.get(1)){
				case "agents": 
					call = "select * FROM agency.query_agent_resource(?)"; 
					type = "AGENCY.AGENT";
					break;
				case "agentTemplates": 
					call = "select * FROM agency.query_agentTemplate_resource(?)"; 
					type = "AGENCY.AGENTTEMPLATE";
					break;
				case "structuralNodes": 
					call = "select * FROM agency.query_structuralNode_resource(?)"; 
					type = "AGENCY.STRUCTURALNODE";
					break;
				case "dataTags": 
					call = "select * FROM agency.query_dataTag_resource(?)"; 
					type = "AGENCY.DATATAG";
					break;
				case "users": 
					call = "select * FROM agency.query_user_resource(?)"; 
					type = "AGENCY.USER";
					break;
				default: throw new StorageErrorException("invalid resource request");
			}
			CallableStatement cs = connection.prepareCall(call);
			
			cs.setObject(1, UUID.fromString(resource_path.get(2)));
			ResultSet storage_result = cs.executeQuery();
			
			storage_result.next();
			String id_string = storage_result.getObject("id").toString();
			result = factory.build(id_string, type);
			if(!result.readStorageResult(storage_result))
				throw new ServiceErrorException("could not create object from storage data");			
		} catch(SQLException | ServiceErrorException err) {err.printStackTrace();}
		
		return result;
	}
	
	@Override
	public Set<T> queryCollection(List<String> resource_path, Map<String, String> query) throws StorageErrorException {
		Set<T> returnable_result = new HashSet<T>();

		try{
			String call;
			String type;
			switch(resource_path.get(1)){
				case "agents": 
					call = "select * FROM agency.query_agent_collection(?,?,?)"; 
					type = "AGENCY.AGENT";
					break;
				case "agentTemplates": 
					call = "select * FROM agency.query_agentTemplate_collection(?,?,?)"; 
					type = "AGENCY.AGENTTEMPLATE";
					break;
				case "structuralNodes": 
					call = "select * FROM agency.query_structuralNode_collection(?,?,?)"; 
					type = "AGENCY.STRUCTURALNODE";
					break;
				case "dataTags": 
					call = "select * FROM agency.query_dataTag_collection(?,?,?)"; 
					type = "AGENCY.DATATAG";
					break;
				case "users": 
					call = "select * FROM agency.query_user_collection(?,?,?)"; 
					type = "AGENCY.USER";
					break;
				default: throw new StorageErrorException("invalid resource request");
			}
			CallableStatement cs = connection.prepareCall(call);
			cs.setArray(1, connection.createArrayOf("text", resource_path.toArray()));
			cs.setArray(2, connection.createArrayOf("text", query.keySet().toArray()));
			cs.setArray(3, connection.createArrayOf("text", query.values().toArray()));
			ResultSet storage_result = cs.executeQuery();


			//TODO: SQL functions are not yet implementing the resource and query params
			// for now, any query is returning complete set based on type
			while(storage_result.next()) {
				T agencyObj;
				String id_string = storage_result.getObject("id").toString();

				agencyObj = factory.build(id_string, type);
				if(!agencyObj.readStorageResult(storage_result))
					throw new ServiceErrorException("could not create object from storage data");
				returnable_result.add(agencyObj);
			}
		} catch(SQLException | ServiceErrorException e){ throw new StorageErrorException("error with database query"); } 

		return returnable_result;
	}



}
