package simpledoc;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.exceptions.StorageErrorException;

public interface ServiceFunction {
	public ResourceResponse run(ResourceRequest request, StorageControl storage) throws ServiceErrorException, StorageErrorException ;
}
