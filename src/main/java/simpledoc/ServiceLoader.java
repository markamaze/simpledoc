package simpledoc;

import simpledoc.exceptions.ServiceErrorException;
import java.util.List;
import simpledoc.services.agency.AgencyService;
import simpledoc.services.forms.FormsService;
import simpledoc.services.communications.CommunicationsService;
import simpledoc.services.training.TrainingService;
import simpledoc.services.tasks.TasksService;


public class ServiceLoader {
	private static AgencyService agency;
	private static FormsService forms;
	private static CommunicationsService communications;
	private static TrainingService training;
	private static TasksService tasks;
	
	public ServiceLoader() {
		agency = new AgencyService();
		forms = new FormsService();
		communications = new CommunicationsService();
		training = new TrainingService();
		tasks = new TasksService();
		
		agency.run();
		forms.run();
		communications.run();
		training.run();
		tasks.run();
	}

	public ServiceFunction load(List<String> resource_path, String method) throws ServiceErrorException {
		String module = resource_path.get(0);
		
		switch(module) {
			case "agency": return agency.moduleRoutes(resource_path);
			case "Forms": return forms.moduleRoutes(resource_path);
			case "Communications": return communications.moduleRoutes(resource_path);
			case "Training": return training.moduleRoutes(resource_path);
			case "Tasks": return tasks.moduleRoutes(resource_path);
			default: throw new ServiceErrorException("Requested module not found");
		}
	}
}
