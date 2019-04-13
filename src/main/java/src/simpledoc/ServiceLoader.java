package simpledoc;

import java.util.HashMap;
import java.util.Map;

import simpledoc.services.agency.AgencyService;
//import simpledoc.services.forms.FormsService;



//TODO: this feels like it should be refactored
public class ServiceLoader {
	private Map<String, Map<String, ServiceFunction>> services;
	
	public ServiceLoader() {
		services = new HashMap<String, Map<String, ServiceFunction>>();
		services.put("Agency", new AgencyService().provideServices());
//		services.put("Forms", new FormsService().provideServices());
	}
	


	public ServiceFunction load(String module, String method ) {
		return services.get(module).get(method);		
	}
}
