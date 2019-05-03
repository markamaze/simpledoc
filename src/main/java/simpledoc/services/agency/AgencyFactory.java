package simpledoc.services.agency;

import java.util.Map;
import java.util.UUID;

import simpledoc.services.ModuleObject;
import simpledoc.services.ModuleObjectFactory;


//this feels like there should be a more functional approach I could take
public class AgencyFactory implements ModuleObjectFactory {	

	
	public ModuleObject build(Map<String, Object> data_item) {
		String type = (String) data_item.get("type");
		if(type.equalsIgnoreCase("AGENCY_AGENT")) return buildAgent(data_item);
		if(type.equalsIgnoreCase("AGENCY_DEFINITION")) return buildDefinition(data_item);
		if(type.equalsIgnoreCase("AGENCY.CATEGORY")) return buildCategory(data_item);
			
		return null;
	}

	@SuppressWarnings("unchecked")
	private ModuleObject buildCategory(Map<String, Object> data_item) {
		AgentCategoryObject new_agent_category = null;
		
		String object_id = data_item.get("id") != null ? (String) data_item.get("id") : null;
		String object_type = (String) data_item.get("type");
		Map<String, Object> object_data = data_item.get("object_data") != null ? (Map<String, Object>) data_item.get("object_data") : null;
		
		String label = object_data.get("category_label") != null ? (String) object_data.get("category_label") : null;
		String category_type = object_data.get("category_type") != null ? (String) object_data.get("category_type") : null;
		String security_setting = (String) object_data.get("category_security");
		Map<String, Object> data_definition = (Map<String, Object>) object_data.get("category_data_structure");

		if(object_id.equalsIgnoreCase("new")) {
			new_agent_category = new AgentCategoryObject(UUID.randomUUID().toString(), object_type);
		} else new_agent_category = new AgentCategoryObject(object_id, object_type);
		
		new_agent_category.setCategoryLabel(label);
		new_agent_category.setCategoryBehavior(category_type);
		new_agent_category.setCategorySecurity(security_setting);
		new_agent_category.setCategoryDataDef(data_definition);
		
		
		return new_agent_category;
	}

	@SuppressWarnings("unchecked")
	private ModuleObject buildDefinition(Map<String, Object> data_item) {
		AgentDefObject new_agent_definition = null;
		String object_id = data_item.get("id") != null ? (String) data_item.get("id") : null;
		String object_type = (String) data_item.get("type");
		Map<String, Object> object_data = data_item.get("object_data") != null ? (Map<String, Object>) data_item.get("object_data") : null;

		String label = object_data.get("definition_label") != null ? (String) object_data.get("definition_label") : null;
		String category_id = object_data.get("category_id") != null ? (String) object_data.get("category_id") : null;
		String security_setting = object_data.get("definition_security") != null ? (String) 
object_data.get("definition_security") : null;
		Map<String, Object> data_definition = object_data.get("definition_data_structure") != null ? (Map<String, Object>) 
object_data.get("definition_data_structure") : null;

		if(object_id == null) {
			new_agent_definition = new AgentDefObject(UUID.randomUUID().toString(), object_type);
		} else new_agent_definition = new AgentDefObject(object_id, object_type);
		
		new_agent_definition.setDefinitionLabel(label);
		new_agent_definition.setCategoryId(category_id);
		new_agent_definition.setDefinitionSecurity(security_setting);
		new_agent_definition.setCategoryDataDef(data_definition);
		return new_agent_definition;
	}

	@SuppressWarnings("unchecked")
	private ModuleObject buildAgent(Map<String, Object> data_item) {
		AgencyObject new_object;

		String object_id = data_item.get("id") != null ? (String) data_item.get("id") : null;
		String object_type = (String) data_item.get("type");
		Map<String, Object> object_data = data_item.get("object_data") != null ? (Map<String, Object>) data_item.get("object_data") : null;
		
		String security_setting = (String) object_data.get("agent_security");
		String agent_link_id = (String) object_data.get("agent_link");
		Map<String, Object> agent_data = (Map<String, Object>) object_data.get("agent_data");
		Map<String, Object> data_definition = (Map<String, Object>) object_data.get("agent_data_structure");
	
		String agent_type = object_type + "_" + 
							(String) data_definition.get("category_label") + "_" +
							(String) data_definition.get("definition_label");
				
				
		if(object_id == null || object_id.equalsIgnoreCase("uuid")) {
			new_object = new AgencyObject(UUID.randomUUID().toString(), agent_type);
		} else new_object = new AgencyObject(object_id, agent_type);
		
		if(agent_link_id == null || agent_link_id.equalsIgnoreCase("uuid")) {
			new_object.setAgentLinkId(UUID.randomUUID().toString());
		} else new_object.setAgentLinkId(agent_link_id);
		new_object.setAgentData((Map<String, Object>)agent_data);
		new_object.setDefinitionId(data_definition.get("data_definition_id").toString());
		new_object.setAgentSecurity(security_setting);
				
		return new_object;
	}
}
