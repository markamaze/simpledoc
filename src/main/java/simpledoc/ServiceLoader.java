package simpledoc;

import simpledoc.exceptions.UnsupportedServiceRequest;
import java.util.HashMap;
import java.util.Map;

import simpledoc.services.agency.AgencyService;
import simpledoc.services.forms.FormsService;


//TODO: rework this with routes - handle unknown requests
public class ServiceLoader {
	private Map<String, Map<String, ServiceFunction>> services;

	public ServiceLoader() {
		services = new HashMap<String, Map<String, ServiceFunction>>();
		services.put("Agency", new AgencyService<>().provideServices());
		services.put("Forms", new FormsService<>().provideServices());
	}



	public ServiceFunction load(String module, String method ) throws UnsupportedServiceRequest {
		Map<String, ServiceFunction> service_module = services.get(module);
		if (service_module.equals(null)) throw new UnsupportedServiceRequest("service requested not found");

		ServiceFunction service = service_module.get(method);
		if (service.equals(null)) throw new UnsupportedServiceRequest("service does not support this HTTPMethod");

		return service;
	}
}
