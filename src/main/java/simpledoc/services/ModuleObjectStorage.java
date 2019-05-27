package simpledoc.services;

import simpledoc.exceptions.StorageErrorException;
import java.util.UUID;
import java.util.Set;
import java.util.List;
import java.util.Map;


public interface ModuleObjectStorage {

	public abstract boolean create(Set<ModuleObject> input) throws StorageErrorException;
	public abstract boolean update(Set<ModuleObject> input) throws StorageErrorException;
	public abstract boolean delete(Map<String, UUID> input) throws StorageErrorException;
	public abstract Set<String[]> query(List<String> resource_path, Map<String, String> query) throws StorageErrorException;
}
