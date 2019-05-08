package simpledoc.services.agency;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import simpledoc.services.ModuleObject;
import simpledoc.services.ServiceModule;
import simpledoc.ParseObject;
import simpledoc.ResourceResponse;
import simpledoc.ServiceFunction;


public class AgencyService implements ServiceModule {

	public String moduleTitle() { return "Agency"; }

	public Map<String, ServiceFunction> provideServices() {
		Map<String, ServiceFunction> services = new HashMap<String, ServiceFunction>();

		services.put("POST", request -> {
			AgencyFactory factory = new AgencyFactory();
			AgencyStorage storage = new AgencyStorage();
			ResourceResponse response = new ResourceResponse();
			List<ModuleObject> data = new ArrayList<>();
			
			request.getBodyElementList("data").forEach(item -> {
				if(item instanceof HashMap) {
					@SuppressWarnings("unchecked")
					Map<String, Object> item_map = (Map<String, Object>) item;
					data.add(factory.build(item_map));
					response.setRequestOpFlag(true);
				} else response.setRequestOpFlag(false);
			});

			//can put more logic in here when needed


			if(response.getRequestOpFlag())
				response.setStorageOpFlag(storage.create(data));
			else response.setStorageOpFlag(false);

			if(response.getStorageOpFlag()) {
				Object data_array = data.stream().map( object -> object.getId()).toArray();
				response.setResponseBody(ParseObject.writeJSONString(data_array));
				response.setRequestOpFlag(true);
			}
			else response.setResponseOpFlag(false);


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
			response.setResponseBody(result_map);


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
