package simpledoc;

import simpledoc.exceptions.ServiceErrorException;
import java.util.List;
import simpledoc.services.agency.AgencyService;
import simpledoc.services.forms.FormsService;


public class ServiceLoader {
	private static AgencyService agency;
	private static FormsService forms;
	
	public ServiceLoader() {
		agency = new AgencyService();
		forms = new FormsService();
	}

	public ServiceFunction load(List<String> resource_path, String method) throws ServiceErrorException {
		String module = resource_path.get(0);

		
		if(module.equals("Agency")) return agency.moduleRoutes(resource_path);
		else if(module.equals("Forms")) return forms.moduleRoutes(resource_path);
		else throw new ServiceErrorException("Requested module not found");
	}
}
