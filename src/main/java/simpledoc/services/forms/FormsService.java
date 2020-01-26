package simpledoc.services.forms;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import simpledoc.ResourceResponse;
import simpledoc.ServiceFunction;
import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectData;
import simpledoc.services.ServiceModule;

public class FormsService<T extends ModuleObject> implements ServiceModule {

	public String moduleTitle() { return "Forms"; }

	public Map<String, ServiceFunction> provideServices() {
		Map<String, ServiceFunction> services = new HashMap<String, ServiceFunction>();

    //TODO: finish building service functions
    services.put("POST", request -> { 
    	FormsValidator validator = new FormsValidator();
    	FormsStorage<T> storage = new FormsStorage<T>();
    	ResourceResponse response = new ResourceResponse();
    	FormsFactory<T> factory = new FormsFactory<T>();
    	Set<String> result_data = new HashSet<String>();
    	Set<T> working_data = new HashSet<T>();
    	
    	validator.validateRequest(request.getDataSet(), request.method(), request.resource());
    	
    	for( ModuleObjectData item : request.getDataSet()) {
    		working_data.add(factory.build(item));
    	}
    	
    	storage.create(working_data);
    	
    	working_data.stream().forEach( item -> {
    		result_data.add(item.getId().toString());
    	});
    	
    	
    	return response.setResponse(result_data, 200);
    });
    
    
    services.put("PUT", request -> {
    	FormsValidator validator = new FormsValidator();
			FormsStorage<T> storage = new FormsStorage<T>();
			ResourceResponse response = new ResourceResponse();
			Set<T> working_data = new HashSet<T>();


			validator.validateRequest(request.getDataSet(), request.method(), request.resource());
			
			for(ModuleObjectData item : request.getDataSet()) {

				String id = item.getIdString();
				String type = item.getType();
				List<String> resource = new ArrayList<String>();
				
				resource.add("Forms");
				switch(type) {
					case "FORMS.FORMS":
						resource.add("forms");
						break;
					case "FORMS.FORMSETS":
						resource.add("formSets");
						break;
					case "FORMS.SUBMISSIONS":
						resource.add("submissions");
						break;
					case "FORMS.SECTIONS":
						resource.add("sections");
						break;
					case "FORMS.LAYOUTS":
						resource.add("layouts");
						break;
					case "FORMS.ELEMENTS":
						resource.add("elements");
						break;
				}
				resource.add(id);
				
				T currentObj = storage.queryResource(resource, Collections.emptyMap());

				currentObj.update(item.getObjectData());
				working_data.add(currentObj);
			}

			storage.update(working_data);

			return response.setResponse("\"Successfully updated objects.\"", 200);

    	
    	
    });
    services.put("DELETE", request -> { 
		FormsValidator validator = new FormsValidator();
		FormsStorage<T> storage = new FormsStorage<T>();
		ResourceResponse response = new ResourceResponse();
		Map<String, UUID> working_data = new HashMap<String, UUID>();

		//delete requests shouldn't have anything in the body?
		//is it just a uuid string in the url? or is there a dataset in the body of the request?

		validator.validateRequest(request.getDataSet(), request.method(), request.resource());

		for(ModuleObjectData item : request.getDataSet()){
			working_data.put(item.getType(), UUID.fromString(item.getIdString()));
		}

		storage.delete(working_data);

		return response.setResponse("\"All objects successfully removed from storage\"", 200);

    });
    services.put("GET", request -> { 
		FormsValidator validator = new FormsValidator();
		FormsStorage<T> storage = new FormsStorage<T>();
		ResourceResponse response = new ResourceResponse();
		Set<T> working_data = null;
		String response_string = "";
		
		validator.validateRequest(null, request.method(), request.resource());

		working_data = storage.queryCollection(request.resource(), request.query());
		
		if(working_data.size() < 1) response_string = "[]";
		else {
			response_string = "[";
			for(T item : working_data) {
				response_string += item.writeToJson();
				response_string += ",";
			}
					
			response_string = response_string.substring(0, response_string.length()-1) + "]";
							
		}

		return response.setResponse(response_string, 200);

    });
    
    return services;
  }
}
