package simpledoc.services.agency;

import simpledoc.RequestData;
import java.util.Set;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.UUID;
import simpledoc.ResourceResponse;
import simpledoc.ServiceFunction;
import simpledoc.services.ModuleObject;
import simpledoc.services.ServiceModule;


public class AgencyService implements ServiceModule {

	public String moduleTitle() { return "Agency"; }

	public Map<String, ServiceFunction> provideServices() {
		Map<String, ServiceFunction> services = new HashMap<String, ServiceFunction>();

		services.put("POST", request -> {
			AgencyValidator validator = new AgencyValidator();
			AgencyStorage storage = new AgencyStorage();
			Set<String> result_data = new HashSet<String>();
			ResourceResponse response = new ResourceResponse();
			Set<ModuleObject> working_data = new HashSet<ModuleObject>();
			AgencyFactory factory = new AgencyFactory();



			validator.validateRequest(request.getDataSet(), request.method(), request.resource());


			for( RequestData item : request.getDataSet()){
				working_data.add(factory.build(item));
			}


			storage.create(working_data);


			working_data.stream().forEach( item -> {
				result_data.add(item.getId().toString());
			});


			return response.setResponse(result_data, 200);
		});



		services.put("PUT", request -> {
			AgencyValidator validator = new AgencyValidator();
			AgencyStorage storage = new AgencyStorage();
			ResourceResponse response = new ResourceResponse();
			AgencyFactory factory = new AgencyFactory();
			Set<ModuleObject> working_data = new HashSet<ModuleObject>();


			validator.validateRequest(request.getDataSet(), request.method(), request.resource());


			for(RequestData item: request.getDataSet()){
				working_data.add(factory.build(item));
			}


			storage.update(working_data);


			return response.setResponse("Successfully updated objects.", 200);

		});



		services.put("DELETE", request -> {
			AgencyValidator validator = new AgencyValidator();
			AgencyStorage storage = new AgencyStorage();
			ResourceResponse response = new ResourceResponse();
			Map<String, UUID> working_data = new HashMap<String, UUID>();


			//TODO BUG: when validating request, need to differentiate between what the data should contain.
			//		For example: a DELETE request will only contain id and type, no object_data
			//								a PUT request may not contain all elements of the object_data structure
			//								a GET request should have a null dataSet as there is no request body
			validator.validateRequest(request.getDataSet(), request.method(), request.resource());


			for(RequestData item : request.getDataSet()){
				working_data.put(item.getType(), UUID.fromString(item.getIdString()));
			}


			storage.delete(working_data);


			return response.setResponse("All objects successfully removed from storage", 200);

		});



		//TODO: BUG: somehow I'm loosing first digit of UUID's when getting from DB
		services.put("GET", request -> {
			AgencyValidator validator = new AgencyValidator();
			AgencyStorage storage = new AgencyStorage();
			ResourceResponse response = new ResourceResponse();

//			AgencyFactory factory = new AgencyFactory();

			Set<String[]> working_data = null;
//			Set<ModuleObject> result_data = new HashSet<ModuleObject>();



			validator.validateRequest(null, request.method(), request.resource());


			working_data = storage.query(request.resource(), request.query());


			//TODO: not sure if I should build agency objects from results from storage
			// on one hand, it provides validation prior to sending response
			// on the other, the data was valid when sent to the database and should be unchanged?
//			for(String[] item: working_data){
//				result_data.add(factory.build(item));
//			}



			return response.setResponse(working_data, 200);

		});



		// //TODO: add business logic for subscribing to other ServiceModules
		// services.put("subscribe", request -> {
		// 	System.out.println("subscribe Agency Service Called");
		// 	ResourceResponse response = null;
		// 	return response;
		// });
		//
		//
		//
		// //TODO: add business logic to unsubscribe from other ServiceModules
		// services.put("unsubscribe", request -> {
		// 	System.out.println("unsubscribe Agency Service Called");
		// 	ResourceResponse response = null;
		// 	return response;
		// });
		//
		//
		// //TODO: add business logic to notify other ServiceModules
		// services.put("notify", request -> {
		// 	System.out.println("notify Agency Service Called");
		// 	ResourceResponse response = null;
		// 	return response;
		// });

		return services;
	}
}
