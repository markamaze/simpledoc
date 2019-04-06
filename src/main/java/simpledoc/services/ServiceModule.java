package simpledoc.services;

import java.util.Map;

import simpledoc.ServiceFunction;


public interface ServiceModule {

	public abstract Map<String, ServiceFunction> provideServices();
	public abstract String moduleTitle();
}