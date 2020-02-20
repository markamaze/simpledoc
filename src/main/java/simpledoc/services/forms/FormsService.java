package simpledoc.services.forms;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import simpledoc.ResourceRequest;
import simpledoc.ResourceResponse;
import simpledoc.ServiceFunction;
import simpledoc.StorageControl;
import simpledoc.exceptions.ServiceErrorException;
import simpledoc.exceptions.StorageErrorException;
import simpledoc.exceptions.UnsupportedServiceRequest;
import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectData;
import simpledoc.services.ServiceModule;

public class FormsService implements ServiceModule {

	@Override
	public String moduleTitle() { return "Forms"; }
	
	@Override
	public ServiceFunction moduleRoutes(List<String> resource_path) throws ServiceErrorException  {
		String route;
		
		if(resource_path.size() > 1) route = resource_path.get(1);
		else route = "";
		
		if(route.equals("service")) return (request, storage) -> publicServices(request, storage);
		else return (request, storage) -> {
				switch(request.method()) {
					case "GET": return handleGET(request, storage);
					case "PUT": try {
						return handlePUT(request, storage);
					} catch (SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					case "POST": try {
						return handlePOST(request, storage);
					} catch (SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					case "DELETE": return handleDELETE(request, storage);
					default: throw new ServiceErrorException("invalid method on request");
				}
		};
	}
	
	
	private ResourceResponse publicServices(ResourceRequest request, StorageControl storage) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	private <T extends ModuleObject> ResourceResponse handleGET(ResourceRequest request, StorageControl storage) throws ServiceErrorException, StorageErrorException {
		FormsValidator validator = new FormsValidator();
		ResourceResponse response = new ResourceResponse();
		FormsFactory<T> factory = new FormsFactory<T>();
		Set<T> working_data = null;
		String response_string = "";

		try {
			validator.validateRequest(null, request.method(), request.resource());
	
			working_data = storage.queryCollection(request.resource(), request.query(), factory);
	
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
		} catch(UnsupportedServiceRequest err) { throw new ServiceErrorException(err + "could not validate data"); }
	}
	
	private <T extends ModuleObject> ResourceResponse handlePOST(ResourceRequest request, StorageControl storage) throws ServiceErrorException, SQLException {
    	FormsValidator validator = new FormsValidator();
    	ResourceResponse response = new ResourceResponse();
    	FormsFactory<T> factory = new FormsFactory<T>();
    	Set<String> result_data = new HashSet<String>();
    	Set<T> working_data = new HashSet<T>();

    	try {
	    	validator.validateRequest(request.getDataSet(), request.method(), request.resource());
	
	    	for( ModuleObjectData item : request.getDataSet()) {
	    		working_data.add(factory.build(item));
	    	}
	
	    	storage.create(working_data);
	
	    	working_data.stream().forEach( item -> {
	    		result_data.add(item.getId().toString());
	    	});
	
	
	    	return response.setResponse(result_data, 200);
		} catch(UnsupportedServiceRequest err) { throw new ServiceErrorException(err + "could not validate data"); }
	}

	private <T extends ModuleObject> ResourceResponse handlePUT(ResourceRequest request, StorageControl storage) throws ServiceErrorException, SQLException {
    	FormsValidator validator = new FormsValidator();
		ResourceResponse response = new ResourceResponse();
		Set<T> working_data = new HashSet<T>();
		FormsFactory<T> factory = new FormsFactory<T>();

		try {
			validator.validateRequest(request.getDataSet(), request.method(), request.resource());
	
			for(ModuleObjectData item : request.getDataSet()) {
				T currentObj;
				String id = item.getIdString();
	
				if(id.startsWith("n-")) {
					currentObj = factory.build(item);
				}
				else {
					String type = item.getType();
					List<String> resource = new ArrayList<String>();
					resource.add(id);
					resource.add("Forms");
					switch(type) {
						case "FORMS.FORM":
							resource.add("form");
							break;
						case "FORMS.FORMSET":
							resource.add("formSet");
							break;
						case "FORMS.SUBMISSION":
							resource.add("submission");
							break;
						case "FORMS.SECTIONS":
							resource.add("section");
							break;
						case "FORMS.LAYOUT":
							resource.add("layout");
							break;
						case "FORMS.ELEMENTS":
							resource.add("element");
							break;
					}
					currentObj = storage.queryResource(resource, Collections.emptyMap(), factory);
					currentObj.update(item.getObjectData());
				}
				working_data.add(currentObj);
			}
	
			storage.update(working_data);
	
			return response.setResponse("\"Successfully updated objects.\"", 200);
			
		} catch(UnsupportedServiceRequest err) { throw new ServiceErrorException(err + "could not validate data"); }
	}
	
	private <T extends ModuleObject> ResourceResponse handleDELETE(ResourceRequest request, StorageControl storage) throws ServiceErrorException, StorageErrorException {
		FormsValidator validator = new FormsValidator();
		ResourceResponse response = new ResourceResponse();
		Map<String, UUID> working_data = new HashMap<String, UUID>();
		FormsFactory<T> factory = new FormsFactory<T>();

		//delete requests shouldn't have anything in the body?
		//is it just a uuid string in the url? or is there a dataset in the body of the request?
		try {
			validator.validateRequest(request.getDataSet(), request.method(), request.resource());
	
			for(ModuleObjectData item : request.getDataSet()){
				working_data.put(item.getType(), UUID.fromString(item.getIdString()));
			}
	
			storage.delete(working_data, factory);
	
			return response.setResponse("\"All objects successfully removed from storage\"", 200);
		} catch(UnsupportedServiceRequest err) { throw new ServiceErrorException(err + "could not validate data"); }
	}
	
}
