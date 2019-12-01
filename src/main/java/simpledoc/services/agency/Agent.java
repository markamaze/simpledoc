package simpledoc.services.agency;


import java.util.HashSet;
import java.util.Set;
import simpledoc.exceptions.ServiceErrorException;
import java.util.Map;
import java.util.UUID;

import simpledoc.services.ModuleObject;

public class Agent extends ModuleObject {



	AgentCategory(UUID agent_id, String type, Map<String, Object> object_data) throws ServiceErrorException {
		super(agent_id, type);

	}




}
