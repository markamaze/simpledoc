package simpledoc.services;

import simpledoc.exceptions.StorageErrorException;
import java.util.UUID;
import java.util.Set;
import java.util.List;
import java.util.Map;


public interface ModuleObjectStorage<T extends ModuleObject> {

	public abstract boolean create(Set<T> input) throws StorageErrorException;
	public abstract boolean update(Set<T> input) throws StorageErrorException;
	public abstract boolean delete(Map<String, UUID> input) throws StorageErrorException;
	public abstract Set<T> queryCollection(List<String> resource_path, Map<String, String> query) throws StorageErrorException;
	public abstract T queryResource(List<String> resource_path, Map<String, String> query) throws StorageErrorException;
}
