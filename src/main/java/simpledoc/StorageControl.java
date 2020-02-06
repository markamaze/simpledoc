package simpledoc;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.Map.Entry;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.exceptions.StorageErrorException;
import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectFactory;

public class StorageControl {

  private List<Connection> connection_pool;

  StorageControl(String dbURL) throws SQLException{
	connection_pool = new LinkedList<Connection>();
	
    int pool_size = 2;
    while(pool_size > 0){
      connection_pool.add(DriverManager.getConnection(dbURL));
      --pool_size;
    }
  }


  public <T extends ModuleObject> boolean create(Set<T> data) throws StorageErrorException {
	  Boolean committed = true;
	  Connection connection = connection_pool.remove(0);

	  try {
	    connection.setAutoCommit(false);
	    
		for(T object : data) {
			PreparedStatement ps;
			ps = object.writeStorageStatement("create", connection);
				
			int result = ps.executeUpdate();
			if(result < 0) {
			    committed = false;
			    break;
			}
		}
	    
	    if(committed) connection.commit();
	    else {
	    	connection.rollback();
	    	connection_pool.add(connection);
	    	throw new StorageErrorException("database operation unsuccessful");
	    }
	  } catch(SQLException err) {
	      connection_pool.add(connection);
		  err.printStackTrace();
		  throw new StorageErrorException(err + "error in database operation");
	  } catch (ServiceErrorException err) {
		  connection_pool.add(connection);
		  err.printStackTrace();
		  throw new StorageErrorException(err + "error with data sent to database control");
	  }
	  
	  connection_pool.add(connection);
	  return committed;
  }
  
  public <T extends ModuleObject> boolean update(Set<T> data) throws StorageErrorException {
	Boolean committed = true;
    Connection connection = connection_pool.remove(0);
	
    try {
	  connection.setAutoCommit(false);
	    	  
	  for(T obj : data) {
		PreparedStatement cs = obj.writeStorageStatement("update", connection);
		int result = cs.executeUpdate();
		if(result < 0) {
			committed = false;
			break;
		}
	  }
      if(committed) connection.commit();
      else {
    	connection.rollback();
    	connection_pool.add(connection);
    	throw new StorageErrorException("database operation unsuccessful");
      }
    } catch(SQLException err) {
    	connection_pool.add(connection);
	    err.printStackTrace();
	    throw new StorageErrorException(err + "error in database operation");
	} catch (ServiceErrorException err) {
		connection_pool.add(connection);
	    err.printStackTrace();
	    throw new StorageErrorException(err + "error with data sent to database control");
	}
    connection_pool.add(connection);
	return committed;
  }

  public <T extends ModuleObject, S extends ModuleObjectFactory<T>> boolean delete(Map<String, UUID> data, S factory_helper) throws StorageErrorException {
		Boolean committed = true;
	    Connection connection = connection_pool.remove(0);

		try {
			connection.setAutoCommit(false);
			for(Entry<String, UUID> entry : data.entrySet()) {
				String type = entry.getKey();
				UUID id = entry.getValue();
				String call = factory_helper.getStorageCall("delete", type, id.toString());
				PreparedStatement cs = connection.prepareStatement(call);
				int result = cs.executeUpdate();
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
		} catch(SQLException err) {
	    	connection_pool.add(connection);
		    err.printStackTrace();
		    throw new StorageErrorException(err + "error in database operation");
		}
		
		connection_pool.add(connection);
		return committed;
	  
  }
  
  public <T extends ModuleObject, S extends ModuleObjectFactory<T>> T queryResource(List<String> resource_path, Map<String, String> query, S factory_helper) throws StorageErrorException {
	T result = null;
	Connection connection = connection_pool.remove(0);

	try {
		connection.setAutoCommit(false);
		String type = resource_path.get(1);
		String call = factory_helper.getStorageCall("queryResource", type, null);
		
		CallableStatement cs = connection.prepareCall(call);
		
		cs.setObject(1, UUID.fromString(resource_path.get(2)));
		ResultSet storage_result = cs.executeQuery();
		
		storage_result.next();
		String id_string = storage_result.getObject("id").toString();
		result = factory_helper.build(id_string, type);
		if(!result.readStorageResult(storage_result))
			throw new ServiceErrorException("could not create object from storage data");			

		
		
		
	} catch(SQLException err) {
    	connection_pool.add(connection);
	    err.printStackTrace();
	    throw new StorageErrorException(err + "error in database operation");
	} catch (ServiceErrorException err) {
		connection_pool.add(connection);
	    err.printStackTrace();
	    throw new StorageErrorException(err + "error with data sent to database control");
	}
	
	connection_pool.add(connection);
	return result;
  }
  
  public <T extends ModuleObject, S extends ModuleObjectFactory<T>> Set<T> queryCollection(List<String> resource_path, Map<String, String> query, S factory_helper) throws StorageErrorException {
	Set<T> returnable_result = new HashSet<T>();
	Connection connection = connection_pool.remove(0);
	Map<String, ResultSet> storage_result_set = new HashMap<String, ResultSet>();
	try {
		connection.setAutoCommit(false);

		if(resource_path == null 
				|| resource_path.size() < 1 
				|| resource_path.size() > 2) throw new ServiceErrorException("invalid url");
		
		else if(resource_path.size() == 1) {
			Set<String> typeCollection = factory_helper.getTypeSet();
			
			for(String type : typeCollection) {
				String call = factory_helper.getStorageCall("queryCollection", type, null);
				storage_result_set.put(type, performQuery(connection, call, resource_path, query));		
			}
		}
		else if(resource_path.size() == 2) {
			String type = resource_path.get(1);
			String call = factory_helper.getStorageCall("queryCollection", type, null);
			
			
			storage_result_set.put(type, performQuery(connection, call, resource_path, query));			
		} else throw new ServiceErrorException("unhandled url");


		for(Entry<String, ResultSet> result_entry : storage_result_set.entrySet()) {
			//TODO: SQL functions are not yet implementing the resource and query params
			// for now, any query is returning complete set based on type
			String type = result_entry.getKey();
			ResultSet storage_result = result_entry.getValue();
			while(storage_result.next()) {
				T agencyObj;
				String id_string = storage_result.getObject("id").toString();

				agencyObj = factory_helper.build(id_string, type);
				if(!agencyObj.readStorageResult(storage_result))
					throw new ServiceErrorException("could not create object from storage data");
				returnable_result.add(agencyObj);
			}
		}		
	} catch(SQLException err) {
    	connection_pool.add(connection);
	    err.printStackTrace();
	    throw new StorageErrorException(err + "error in database operation");
	} catch (ServiceErrorException err) {
		connection_pool.add(connection);
	    err.printStackTrace();
	    throw new StorageErrorException(err + "error with data sent to database control");
	}
	
	connection_pool.add(connection);
	return returnable_result;
  }
  
  private ResultSet performQuery(Connection connection, String call, List<String> resource_path, Map<String, String> query) throws SQLException {
		CallableStatement cs = connection.prepareCall(call);
		cs.setArray(1, connection.createArrayOf("text", resource_path.toArray()));
		cs.setArray(2, connection.createArrayOf("text", query.keySet().toArray()));
		cs.setArray(3, connection.createArrayOf("text", query.values().toArray()));
		return cs.executeQuery();
  }
}
