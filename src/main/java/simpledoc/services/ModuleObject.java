package simpledoc.services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;
import java.util.UUID;
import simpledoc.exceptions.ServiceErrorException;
public abstract class ModuleObject {

	private String object_id;
	private String object_type;

	public ModuleObject(String string, String type) {
		this.object_id = string;
		this.object_type = type;
	}

	public String getId() { return this.object_id; }
	public String getModuleObjectType() { return this.object_type; }

	public abstract boolean update(Map<String, Object> objectData) throws ServiceErrorException, SQLException;

	public abstract boolean readStorageResult(ResultSet rs) throws SQLException, ServiceErrorException;
	public abstract PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException, SQLException;

	public abstract String writeToJson();

}
