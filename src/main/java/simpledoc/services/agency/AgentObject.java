package simpledoc.services.agency;

import java.util.Set;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.UUID;
import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;

public class AgentObject extends ModuleObject {

	private UUID definition_id;
	private UUID agent_link_id;
	private String agent_security;
	private Map<String, Object> agent_data;
	private Map<String, String> agent_data_structure;


	AgentObject(UUID agent_id, String object_type, Map<String, Object> object_data) throws ServiceErrorException{
		super(agent_id, object_type);

		UUID definition_id = AgencyValidator.validUUIDString(object_data.get("definition_id"));
		UUID agent_link_id = AgencyValidator.validUUIDString(object_data.get("agent_link_id"));
		String agent_security = AgencyValidator.validSecurity(object_data.get("agent_security"));
		Map<String, String> agent_data_structure = AgencyValidator.validDataStruct(object_data.get("agent_data_structure"));
		Map<String, Object> agent_data = new HashMap<>(); /*TODO not sure what to do with this, may remove from AgentObject
																							and collect all agent data another way*/


		this.setDefinitionId(definition_id);
		this.setAgentLinkId(agent_link_id);
		this.setAgentSecurity(agent_security);
		this.setAgentDataStructure(agent_data_structure);
		this.setAgentData(agent_data);
	}


	public UUID getDefinitionId() { return this.definition_id; }
	private void setDefinitionId(UUID uuid) { this.definition_id = uuid;	}


	public UUID getAgentLinkId() { return this.agent_link_id; }
	private void setAgentLinkId(UUID link_id) { this.agent_link_id = link_id; }


	public String getAgentSecurity() { return this.agent_security; }
	private void setAgentSecurity(String security_setting) { this.agent_security = security_setting; }


	public Map<String, Object> getAgentData() { return this.agent_data; }
	private void setAgentData(Map<String, Object> agent_data) { this.agent_data = agent_data; }


	public Map<String, String> getAgentDataStructure() { return this.agent_data_structure; }
	private void setAgentDataStructure(Map<String, String> agent_data_structure) { this.agent_data_structure = agent_data_structure; }


	public static Set<String> getKeySet(){
		Set<String> key_set = new HashSet<String>();

		key_set.add("definition_id");
		key_set.add("agent_link_id");
		key_set.add("agent_security");
		key_set.add("agent_data_structure");
		key_set.add("agent_data");

		return key_set;
	}

}
