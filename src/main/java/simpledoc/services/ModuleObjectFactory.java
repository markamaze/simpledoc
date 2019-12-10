package simpledoc.services;

import simpledoc.exceptions.ServiceErrorException;


public interface ModuleObjectFactory<T extends ModuleObject> {
	public T build(ModuleObjectData data) throws ServiceErrorException;
}
