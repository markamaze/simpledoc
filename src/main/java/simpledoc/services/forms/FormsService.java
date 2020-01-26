package simpledoc.services.forms;

import java.util.HashMap;
import java.util.Map;
import simpledoc.ServiceFunction;
import simpledoc.services.ModuleObject;
import simpledoc.services.ServiceModule;


public class FormsService<T extends ModuleObject> implements ServiceModule {

	public String moduleTitle() { return "Forms"; }

	public Map<String, ServiceFunction> provideServices() {
		Map<String, ServiceFunction> services = new HashMap<String, ServiceFunction>();

    //TODO: finish building service functions
    services.put("POST", request -> { return null; });
    services.put("PUT", request -> { return null; });
    services.put("DELETE", request -> { return null; });
    services.put("GET", request -> { return null; });
    
    return services;
  }
}
