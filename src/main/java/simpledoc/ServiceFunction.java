package simpledoc;

import simpledoc.exceptions.UnsupportedServiceRequest;
import simpledoc.exceptions.StorageErrorException;
import simpledoc.exceptions.ServiceErrorException;

public interface ServiceFunction {
	public ResourceResponse run(ResourceRequest request) throws ServiceErrorException, StorageErrorException, UnsupportedServiceRequest;
}
