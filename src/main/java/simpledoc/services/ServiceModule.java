package simpledoc.services;

import java.util.List;

import simpledoc.ServiceFunction;
import simpledoc.exceptions.ServiceErrorException;


public interface ServiceModule extends Runnable{
	public String moduleTitle();
	public ServiceFunction moduleRoutes(List<String> resource_path) throws ServiceErrorException;
}