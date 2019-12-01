package simpledoc.services.agency;


import java.util.HashSet;
import java.util.Set;
import simpledoc.exceptions.ServiceErrorException;
import java.util.Map;
import java.util.UUID;

import simpledoc.services.ModuleObject;

public class StructuralNode extends ModuleObject {



	StructuralNode(UUID structuralNode_id, String type, Map<String, Object> object_data) throws ServiceErrorException {
		super(structuralNode_id, type);

	}




}
