package simpledoc.services.agency;

import java.util.Set;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import simpledoc.ResourceResponse;
import simpledoc.ServiceFunction;
import simpledoc.services.ModuleObject;
import simpledoc.services.ServiceModule;


public class AgencyService implements ServiceModule {

	public String moduleTitle() { return "Agency"; }

	public Map<String, ServiceFunction> provideServices() {
		Map<String, ServiceFunction> services = new HashMap<String, ServiceFunction>();

		services.put("POST", request -> {
			//all services will use these
			AgencyValidator validator = new AgencyValidator(); //always validate request prior to servicing
			AgencyStorage storage = new AgencyStorage();
			Set<String> result_data = Collections.emptySet(); //result data should always be a set of strings
			ResourceResponse response = new ResourceResponse(request);
			//specific to this service
			Set<ModuleObject> working_data = Collections.emptySet(); //working_data used in whatever form required to perform the service
			AgencyFactory factory = new AgencyFactory();


			//if the data/method/URL signature in the request is not valid,
			//	this will throw UnsupportedServiceRequest exception
			validator.validateRequest(request.getDataSet(), request.method(), request.resource());

			//if there is an error with building set of moduleobjects,
			//	this will throw ServiceErrorException
			request.getDataSet().stream().forEach( item -> working_data.add(factory.build(item)));

			//if there is an error with storage operation,
			//	this will throw StorageErrorException
			storage.create(working_data);

			//if no errors thrown before here, everything should be good to build the result_data
			working_data.stream().forEach( item -> {
				result_data.add(item.getId().toString());
			});


			return response.setResponse(result_data, 200);
		});



		services.put("PUT", request -> {
			AgencyFactory factory = new AgencyFactory();
			AgencyStorage storage = new AgencyStorage();
			AgencyValidator validator = new AgencyValidator();
			ResourceResponse response = new ResourceResponse(request);


			Set<Object> request_data = request.getBodyElementSet("data");
			String result_data = "";
			Set<ModuleObject> working_data = Collections.emptySet();


			// step 1: validate the request -> cross-check method, URL, and body_data contents
			if(!validator.validateSupportedRequest(request).isValid())
				throw new UnsupportedServiceRequest("invalid request URL");


			// step *: build and validate working data set
			request_data.stream().forEach( item -> working_data.add(factory.build(item)));
			if(!validator.validateSetAs(working_data, ModuleObject.class).isValid())
				throw new ServiceErrorException("trouble creating new objects with given data");


			// step *: perform database operation
			if(!storage.update(working_data))
				throw new StorageErrorException("unable to update objects in database");


			// step n-1: build response data & validate
			result_data = "Successfully updated objects.";


			// step n: set response data and code in response and return
			return response.setResponse(result_data, 200);

		});



		services.put("DELETE", request -> {
			AgencyStorage storage = new AgencyStorage();
			AgencyValidator validator = new AgencyValidator();
			ResourceResponse response = new ResourceResponse(request);

			Set<Object> request_data = request.getBodyElementSet("data");
			Set<UUID> working_data = Collections.emptySet();
			String result_data = "";

			// step 1: validate the request -> cross-check method, URL, and body_data contents
			if(!validator.validateSupportedRequest(request).isValid())
				throw new UnsupportedServiceRequest("invalid request URL");


			// step *: build and validate working data set
			request_data.stream().forEach( item -> working_data.add( UUID.fromString(item.toString()) ));
			if(!validator.validateSetAs(working_data, UUID.class).isValid())
				throw new UnsupportedServiceRequest("invalid request data");


			// step *: perform database operation
			if(!storage.delete(working_data))
				throw new StorageErrorException("could not remove objects with given id");


			// step n-1: build response data & validate
			result_data = "Objects with given id's successfully removed from storage";


			// step n: set response data and code in response and return
			return response.setResponse(result_data, 200);

		});



		services.put("GET", request -> {
			AgencyFactory factory = new AgencyFactory();
			AgencyStorage storage = new AgencyStorage();
			AgencyValidator validator = new AgencyValidator();
			ResourceResponse response = new ResourceResponse(request);

			Set<String[]> working_data = Collections.emptySet();
			Set<ModuleObject> result_data = Collections.emptySet();

			// step 1: validate the request -> cross-check method, URL, and query contents
			if(!validator.validateSupportedRequest(request).isValid())
				throw new UnsupportedServiceRequest("invalid request ");


			// step *: perform database operation
			working_data = storage.query(request.resource(), request.query());


			// step n-1: build response data & validate
			working_data.stream().forEach( item -> result_data.add(factory.build(item)));
				if(!validator.validateSetAs(result_data, ModuleObject.class).isValid())
					throw new ServiceErrorException("error with response results");

			// step n: set response data and code in response and return
			return response.setResponse(result_data, 200);

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
