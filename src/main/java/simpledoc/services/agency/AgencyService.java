package simpledoc.services.agency;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import simpledoc.services.ModuleObject;
import simpledoc.services.ServiceModule;
import simpledoc.ResourceResponse;
import simpledoc.ServiceFunction;


public class AgencyService implements ServiceModule {

	public String moduleTitle() { return "Agency"; }

	public Map<String, ServiceFunction> provideServices() {
		Map<String, ServiceFunction> services = new HashMap<String, ServiceFunction>();

		//create new Agent Objects
		services.put("POST", request -> {
			AgencyFactory factory = new AgencyFactory();
			AgencyStorage storage = new AgencyStorage();
			ResourceResponse response = new ResourceResponse();
			List<ModuleObject> data = new ArrayList<>();

			request.bodyData().forEach(item -> {
				ModuleObject new_obj = factory.build(item);
				if(new_obj == null) {
					response.setOperationSuccessFlag(false);
					break;
				} else {
					data.add(new_obj);
					response.setOperationSuccessFlag(true);
				}
			});

			//can put more logic in here when needed


			if(response.getOperationSuccessFlag())
				response.setDbSuccessFlag(storage.create(data));
			else response.setErrorMessage("Error while creating resource");

			if(response.getDbSuccessFlag())
				response.setBody(data.stream().map( object -> object.getId()));
			else response.setErrorMessage("Error while writing to database");


			return response;
		});


		//TODO: add business logic for updating AgencyObjects
		services.put("PUT", request -> {
			System.out.println("PUT Agency Service Called");
			ResourceResponse response = null;
			return response;
		});


		//TODO: add business logic for deleting AgencyObjects
		services.put("DELETE", request -> {
			System.out.println("DELETE Agency Service Called");
			ResourceResponse response = null;
			return response;
		});



		services.put("GET", request -> {
			AgencyStorage storage = new AgencyStorage();
			ResourceResponse response = new ResourceResponse();


			List<Object> result_map = storage.query(request.resource(), request.query());

			if(result_map != null)
				response.setDbSuccessFlag(true);
			else response.setDbSuccessFlag(false);

			//can put more logic in here when needed

			if(response.getDbSuccessFlag())
				response.setOperationSuccessFlag(true);
			else response.setOperationSuccessFlag(false);

			if(response.getOperationSuccessFlag())
				response.setBody(result_map.stream());
			else response.setErrorMessage("Error Message Here (eventually identify the source of the error here)");

			return response;
		});



		//TODO: add business logic for subscribing to other ServiceModules
		services.put("subscribe", request -> {
			System.out.println("subscribe Agency Service Called");
			ResourceResponse response = null;
			return response;
		});



		//TODO: add business logic to unsubscribe from other ServiceModules
		services.put("unsubscribe", request -> {
			System.out.println("unsubscribe Agency Service Called");
			ResourceResponse response = null;
			return response;
		});


		//TODO: add business logic to notify other ServiceModules
		services.put("notify", request -> {
			System.out.println("notify Agency Service Called");
			ResourceResponse response = null;
			return response;
		});

		return services;
	}
}
