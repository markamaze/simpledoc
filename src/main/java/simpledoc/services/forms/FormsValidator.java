package simpledoc.services.forms;

import java.util.List;
import java.util.Map.Entry;
import java.util.Set;

import simpledoc.exceptions.UnsupportedServiceRequest;
import simpledoc.services.ModuleObjectData;
import simpledoc.services.ModuleValidation;

public class FormsValidator extends ModuleValidation{

	@Override
	public boolean validateRequest(Set<ModuleObjectData> data, String method, List<String> resource)
			throws UnsupportedServiceRequest {
		// TODO Auto-generated method stub
		return true;
	}

	public static boolean validateCompletionRule(Entry<String, Object> entry) {
		// TODO Auto-generated method stub
		return true;
	}
	
}