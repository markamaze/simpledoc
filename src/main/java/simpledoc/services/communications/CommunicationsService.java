package simpledoc.services.communications;

import java.util.List;

import simpledoc.ServiceFunction;
import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ServiceModule;

public class CommunicationsService implements ServiceModule{

	@Override
	public String moduleTitle() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceFunction moduleRoutes(List<String> resource_path) throws ServiceErrorException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void run() {
		//This starts a thread which is responsible for monitoring subscriptions
		//the module provides the parameters for definition upon subscription
		//then runs its business logic to determine which path defined in the subscription will be executed next
		
	}
	
	

}
