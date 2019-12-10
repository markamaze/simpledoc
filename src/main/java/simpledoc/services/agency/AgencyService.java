package simpledoc.services.agency;

import java.util.Set;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import simpledoc.ResourceResponse;
import simpledoc.ServiceFunction;
import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectData;
import simpledoc.services.ServiceModule;


public class AgencyService<T extends ModuleObject> implements ServiceModule {

	public String moduleTitle() { return "Agency"; }

	public Map<String, ServiceFunction> provideServices() {
		Map<String, ServiceFunction> services = new HashMap<String, ServiceFunction>();

		services.put("POST", request -> {
			AgencyValidator validator = new AgencyValidator();
			AgencyStorage<T> storage = new AgencyStorage<T>();
			ResourceResponse response = new ResourceResponse();
			AgencyFactory<T> factory = new AgencyFactory<T>();
			Set<String> result_data = new HashSet<String>();
			Set<T> working_data = new HashSet<T>();


			validator.validateRequest(request.getDataSet(), request.method(), request.resource());

			for( ModuleObjectData item : request.getDataSet()){
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
			AgencyStorage<T> storage = new AgencyStorage<T>();
			ResourceResponse response = new ResourceResponse();
			Set<T> working_data = new HashSet<T>();


			validator.validateRequest(request.getDataSet(), request.method(), request.resource());
			
			for(ModuleObjectData item : request.getDataSet()) {

				String id = item.getIdString();
				String type = item.getType();
				List<String> resource = new ArrayList<String>();
				
				resource.add("Agency");
				switch(type) {
					case "AGENCY.AGENT":
						resource.add("agents");
						break;
					case "AGENCY.AGENTTEMPLATE":
						resource.add("agentTemplates");
						break;
					case "AGENCY.STRUCTURALNODE":
						resource.add("structuralNodes");
						break;
					case "AGENCY.DATATAG":
						resource.add("dataTags");
						break;
					case "AGENCY.USER":
						resource.add("users");
						break;
				}
				resource.add(id);
				
				T currentObj = storage.queryResource(resource, Collections.emptyMap());

				currentObj.update(item.getObjectData());
				working_data.add(currentObj);
			}

			storage.update(working_data);

			return response.setResponse("Successfully updated objects.", 200);

		});



		services.put("DELETE", request -> {
			AgencyValidator validator = new AgencyValidator();
			AgencyStorage<T> storage = new AgencyStorage<T>();
			ResourceResponse response = new ResourceResponse();
			Map<String, UUID> working_data = new HashMap<String, UUID>();

			//delete requests shouldn't have anything in the body?
			//is it just a uuid string in the url? or is there a dataset in the body of the request?

			validator.validateRequest(request.getDataSet(), request.method(), request.resource());

			for(ModuleObjectData item : request.getDataSet()){
				working_data.put(item.getType(), UUID.fromString(item.getIdString()));
			}

			storage.delete(working_data);

			return response.setResponse("All objects successfully removed from storage", 200);

		});



		services.put("GET", request -> {
			AgencyValidator validator = new AgencyValidator();
			AgencyStorage<T> storage = new AgencyStorage<T>();
			ResourceResponse response = new ResourceResponse();
			Set<T> working_data = null;
			
			validator.validateRequest(null, request.method(), request.resource());

			working_data = storage.queryCollection(request.resource(), request.query());

			return response.setResponse(working_data, 200);

		});

		return services;
	}
}
