package simpledoc.services.agency;

import java.util.HashMap;
import simpledoc.utilities.ValidationObject;
import java.util.Map;
import java.util.UUID;

import simpledoc.services.ModuleObject;

public class AgentObject extends ModuleObject {

	private UUID definition_id;
	private UUID agent_link_id;
	private String agent_security;
	private Map<String, Object> agent_data;
	private Map<String, Object> agent_data_structure;

	public AgentObject(UUID agent_id, String object_type, ValidationObject object_data) {
		super(agent_id, object_type);

		//change constructor such that it takes in an already validated object to pull data from


		Map<String, ?> object_map = object_data.getMapValue();

		this.setDefinitionId((UUID) object_map.get("definition_id"));
		this.setAgentLinkId((UUID) object_map.get("agent_link_id"));
		this.setAgentSecurity((String) object_map.get("agent_security"));
		this.setAgentDataStructure((Map<String, Object>) object_map.get("agent_data_structure"));
		this.setAgentData((Map<String, Object>) object_map.get("agent_data"));
	}

	public static ValidationObject validateData(Map<String, Object> data){
		AgencyValidator validator = new AgencyValidator();
		Map<String, Object> validated_data = null;
		try{
			ValidationObject def_id = validator.validateObjectAs(data.get("definition_id"), UUID.class);
			ValidationObject link_id = validator.validateObjectAs(data.get("agent_link_id"), UUID.class);
			ValidationObject data_structure = validator.validateObjectAs(data.get("agent_data_structure"), Map.class);
			ValidationObject data_values = validator.validateObjectAs(data.get("agent_data"), Map.class);

			if( def_id.isValid()
					&& link_id.isValid()
					&& data_structure.isValid()
					&& data_values.isValid()) {
						validated_data = new HashMap<>();
						validated_data.put("definition_id", def_id.getUUIDValue());
						validated_data.put("agent_link_id", link_id.getUUIDValue());
						validated_data.put("agent_data_structure", data_structure.getMapValue());
						validated_data.put("agent_data", data_values.getMapValue());
					}
		} catch (Exception e) { e.printStackTrace(); }


		return new ValidationObject(validated_data, Map.class);
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
