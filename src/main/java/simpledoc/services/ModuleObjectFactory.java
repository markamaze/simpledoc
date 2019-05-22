package simpledoc.services;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.RequestData;


public interface ModuleObjectFactory {
	public ModuleObject build(RequestData data_item) throws ServiceErrorException;
}
