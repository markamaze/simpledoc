package simpledoc.services;

import java.sql.SQLException;
import java.util.HashSet;
import simpledoc.exceptions.ServiceErrorException;


public interface ModuleObjectFactory<T extends ModuleObject> {
	public T build(ModuleObjectData data) throws ServiceErrorException, SQLException;
	public T build(String id_string, String type) throws ServiceErrorException;
	public String getStorageCall(String string, String type, String id);
	HashSet<String> getTypeSet();
}
