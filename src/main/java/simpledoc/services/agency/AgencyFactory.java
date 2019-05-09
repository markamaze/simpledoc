package simpledoc.services.agency;

import java.util.Map;
import java.util.UUID;

import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectFactory;


//TODO: this feels messy, consider more functional approach
public class AgencyFactory implements ModuleObjectFactory {


	public ModuleObject build(Map<String, Object> data_item) {
		String type = (String) data_item.get("type");
		if(type.equalsIgnoreCase("AGENCY.AGENT")) return buildAgent(data_item);
		if(type.equalsIgnoreCase("AGENCY.DEFINITION")) return buildDefinition(data_item);
		if(type.equalsIgnoreCase("AGENCY.CATEGORY")) return buildCategory(data_item);

		return null;
	}

	@SuppressWarnings("unchecked")
	private ModuleObject buildCategory(Map<String, Object> data_item) {
		AgentCategory new_agent_category = null;

		String object_id_string = data_item.get("id") != null ? (String) data_item.get("id") : null;
		String object_type = (String) data_item.get("type");
		Map<String, Object> object_data = data_item.get("object_data") != null ? (Map<String, Object>) data_item.get("object_data") : null;

		String label = object_data.get("category_label") != null ? (String) object_data.get("category_label") : null;
		String category_type = object_data.get("category_type") != null ? (String) object_data.get("category_type") : null;
		String security_setting = (String) object_data.get("category_security");
		Map<String, Object> data_definition = (Map<String, Object>) object_data.get("category_data_structure");

		if(object_id_string.equalsIgnoreCase("new")) {
			new_agent_category = new AgentCategory(UUID.randomUUID(), object_type);
		} else new_agent_category = new AgentCategory(UUID.fromString(object_id_string), object_type);

		new_agent_category.setCategoryLabel(label);
		new_agent_category.setCategoryBehavior(category_type);
		new_agent_category.setCategorySecurity(security_setting);
		new_agent_category.setCategoryDataDef(data_definition);


		return new_agent_category;
	}

	@SuppressWarnings("unchecked")
	private ModuleObject buildDefinition(Map<String, Object> data_item) {
		AgentDefinition new_agent_definition = null;
		String object_id_string = data_item.get("id") != null ? (String) data_item.get("id") : null;
		String object_type = (String) data_item.get("type");
		Map<String, Object> object_data = data_item.get("object_data") != null ? (Map<String, Object>) data_item.get("object_data") : null;

		String label = object_data.get("definition_label") != null ? (String) object_data.get("definition_label") : null;
		String category_id = object_data.get("category_id") != null ? (String) object_data.get("category_id") : null;
		String security_setting = object_data.get("definition_security") != null ? (String) object_data.get("definition_security") : null;
		Map<String, Object> data_definition = object_data.get("definition_data_structure") != null ? (Map<String, Object>) object_data.get("definition_data_structure") : null;

		if(object_id_string.equalsIgnoreCase("new")) {
			new_agent_definition = new AgentDefinition(UUID.randomUUID(), object_type);
		} else new_agent_definition = new AgentDefinition(UUID.fromString(object_id_string), object_type);

		new_agent_definition.setDefinitionLabel(label);
		new_agent_definition.setCategoryId(UUID.fromString(category_id));
		new_agent_definition.setDefinitionSecurity(security_setting);
		new_agent_definition.setCategoryDataDef(data_definition);
		return new_agent_definition;
	}

	@SuppressWarnings("unchecked")
	private ModuleObject buildAgent(Map<String, Object> data_item) {
		AgentObject new_object;

		String object_id_string = data_item.get("id") != null ? (String) data_item.get("id") : null;
		String object_type = (String) data_item.get("type");
		Map<String, Object> object_data = data_item.get("object_data") != null ? (Map<String, Object>) data_item.get("object_data") : null;

		String security_setting = (String) object_data.get("agent_security");
		String agent_link_id = (String) object_data.get("agent_link");
		String definition_id = (String) object_data.get("data_definition_id");
		Map<String, Object> agent_data = (Map<String, Object>) object_data.get("agent_data");
		Map<String, Object> data_definition = (Map<String, Object>) object_data.get("agent_data_structure");

		String agent_type = object_type + "." +
							(String) data_definition.get("category_label") + "." +
							(String) data_definition.get("definition_label");


		if(object_id_string.equalsIgnoreCase("new")) {
			new_object = new AgentObject(UUID.randomUUID(), agent_type);
		} else new_object = new AgentObject(UUID.fromString(object_id_string), agent_type);

		new_object.setAgentLinkId(UUID.fromString(agent_link_id));
		new_object.setAgentData((Map<String, Object>)agent_data);
		new_object.setDefinitionId(UUID.fromString(definition_id));
		new_object.setAgentSecurity(security_setting);

		return new_object;
	}
}
