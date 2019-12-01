package simpledoc.services.agency;


import java.util.HashSet;
import java.util.Set;
import simpledoc.exceptions.ServiceErrorException;
import java.util.Map;
import java.util.UUID;

import simpledoc.services.ModuleObject;

public class AgentTemplate extends ModuleObject {



	AgentTemplate(UUID template_id, String type, Map<String, Object> object_data) throws ServiceErrorException {
		super(template_id, type);

	}




}
