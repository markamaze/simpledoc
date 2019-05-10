package simpledoc.services.agency;

import simpledoc.utilities.ValidationHandler;
import java.util.Map;
import java.util.UUID;

import simpledoc.services.ModuleObject;

public class AgentObject extends ModuleObject {

	private UUID definition_id;
	private UUID agent_link_id;
	private String agent_security;
	private Map<String, Object> agent_data;
	private Map<String, Object> agent_data_structure;

	public AgentObject(UUID agent_id, String object_type, Map<String, Object> object_data) {
		super(agent_id, object_type);

		UUID def_id = ValidationHandler.getValidUUIDFor("definition_id", object_data);
		UUID link_id = ValidationHandler.getValidUUIDFor("agent_link_id", object_data);
		String security = ValidationHandler.getValidStringFor("agent_security", object_data);
		Map<String, Object> data_structure = ValidationHandler.getValidMapFor("agent_data_structure", object_data);
		Map<String, Object> data = ValidationHandler.getValidMapFor("agent_data", object_data);

		this.setDefinitionId(def_id);
		this.setAgentLinkId(link_id);
		this.setAgentSecurity(security);
		this.setAgentDataStructure(data_structure);
		this.setAgentData(data);
	}

	public UUID getDefinitionId() { return this.definition_id; }
	private void setDefinitionId(UUID uuid) { this.definition_id = uuid;	}

	public UUID getAgentLinkId() { return this.agent_link_id; }
	private void setAgentLinkId(UUID link_id) { this.agent_link_id = link_id; }

	public String getAgentSecurity() { return this.agent_security; }
	private void setAgentSecurity(String security_setting) { this.agent_security = security_setting; }

	public Map<String, Object> getAgentData() { return this.agent_data; }
	private void setAgentData(Map<String, Object> agent_data) { this.agent_data = agent_data; }

	public Map<String, Object> getAgentDataStructure() { return this.agent_data_structure; }
	private void setAgentDataStructure(Map<String, Object> agent_data_structure) { this.agent_data_structure = agent_data_structure; }


}
