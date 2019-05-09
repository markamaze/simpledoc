package simpledoc.services.agency;

import java.util.Map;
import java.util.UUID;

import simpledoc.services.ModuleObject;

public class AgentObject extends ModuleObject {

	private UUID definition_id;
	private UUID agent_link_id;
	private String agent_security;
	private Map<String, Object> agent_data;
	private Map<String, Object> agent_data_structure;

	public AgentObject(UUID agent_id, String object_type) {
		super(agent_id, object_type);
	}

	public UUID getDefinitionId() { return this.definition_id; }
	public void setDefinitionId(UUID uuid) { this.definition_id = uuid;	}

	public UUID getAgentLinkId() { return this.agent_link_id; }
	public void setAgentLinkId(UUID link_id) { this.agent_link_id = link_id; }

	public String getAgentSecurity() { return this.agent_security; }
	public void setAgentSecurity(String security_setting) { this.agent_security = security_setting; }

	public Map<String, Object> getAgentData() { return this.agent_data; }
	public void setAgentData(Map<String, Object> agent_data) { this.agent_data = agent_data; }

	public Map<String, Object> getAgentDataStructure() { return this.agent_data_structure; }
	public void setAgentDataStructure(Map<String, Object> agent_data_structure) { this.agent_data_structure = agent_data_structure; }


}
