package simpledoc.services.agency;


import java.util.HashSet;
import java.util.Set;
import simpledoc.exceptions.ServiceErrorException;
import java.util.Map;
import java.util.UUID;

import simpledoc.services.ModuleObject;

public class User extends ModuleObject {



	User(UUID user_id, String type, Map<String, Object> object_data) throws ServiceErrorException {
		super(user_id, type);

	}




}
