package simpledoc.services;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;


public interface ModuleObjectStorage {

	public abstract boolean create(List<ModuleObject> input) throws SQLException;	
	public abstract boolean update(List<ModuleObject> input);
	public abstract boolean delete(List<ModuleObject> input);
	public abstract List<String[]> query(List<String> resource_path, Map<String, String> query);
}
