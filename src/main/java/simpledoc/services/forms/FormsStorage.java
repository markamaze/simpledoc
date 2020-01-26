package simpledoc.services.forms;

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


public class FormsStorage<T extends ModuleObject> implements ModuleObjectStorage<T> {
	private static Connection connection;
	private FormsFactory<T> factory;

	public FormsStorage() throws StorageErrorException {
		factory = new FormsFactory<T>();
		try {
				String database_url_string = "jdbc:postgresql://localhost:5433/simpledoc?user=mark&password=4323kinj&sslmode=require";
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

        if(type == "FORMS.FORM") call = "delete from forms.forms where id='"+id+"'";
        else if(type == "FORMS.SECTION") call = "delete from forms.sections where id='"+id+"'";
        else if(type == "FORMS.LAYOUT") call = "delete from forms.layouts where id='"+id+"'";
        else if(type == "FORMS.ELEMENT") call = "delete from forms.elements where id='"+id+"'";
        else if(type == "FORMS.FORMSET") call = "delete from forms.formSets where id='"+id+"'";
        else if(type == "FORMS.SUBMISSION") call = "delete from forms.submissions where id='"+id+"'";
        else throw new StorageErrorException("could not delete: invalid Form type");


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
		} catch(SQLException err) { throw new StorageErrorException("couldn't delete objects from database: " + err.getMessage()); }

		return committed;
	}


	@Override
	public T queryResource(List<String> resource_path, Map<String, String> query) throws StorageErrorException {
		T result = null;

		try{
			String call;
			String type;
      String urlType = resource_path.get(1);

			switch(urlType){
				case "form":
					call = "select * FROM forms.query_forms_resource(?)";
					type = "FORMS.FORM";
					break;
				case "formSet":
					call = "select * FROM forms.query_formSets_resource(?)";
					type = "FORMS.FORMSET";
					break;
				case "submission":
					call = "select * FROM forms.query_submissions_resource(?)";
					type = "FORMS.SUBMISSION";
					break;
				case "section":
					call = "select * FROM forms.query_sections_resource(?)";
					type = "FORMS.SECTION";
					break;
				case "layout":
					call = "select * FROM forms.query_layouts_resource(?)";
					type = "FORMS.LAYOUT";
					break;
				case "element":
          call = "select * FROM forms.query_elements_resource(?)";
          type = "FORMS.ELEMENT";
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
      String urlType = resource_path.get(1);

			switch(urlType){
				case "form":
					call = "select * FROM forms.query_forms_collection(?,?,?)";
					type = "FORMS.FORM";
					break;
				case "formSet":
					call = "select * FROM forms.query_formSets_collection(?,?,?)";
					type = "FORMS.FORMSET";
					break;
				case "submission":
					call = "select * FROM forms.query_submissions_collection(?,?,?)";
					type = "FORMS.SUBMISSION";
					break;
				case "section":
					call = "select * FROM forms.query_sections_collection(?,?,?)";
					type = "FORMS.SECTION";
					break;
				case "layout":
					call = "select * FROM forms.query_layouts_collection(?,?,?)";
					type = "FORMS.LAYOUT";
					break;
				case "element":
          call = "select * FROM forms.query_elements_collection(?,?,?)";
          type = "FORMS.ELEMENT";
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
				T formObject;
				String id_string = storage_result.getObject("id").toString();

				formObject = factory.build(id_string, type);
				if(!formObject.readStorageResult(storage_result))
					throw new ServiceErrorException("could not create object from storage data");
				returnable_result.add(formObject);
			}
		} catch(SQLException | ServiceErrorException e){ throw new StorageErrorException("error with database query"); }

		return returnable_result;
	}



}
