package simpledoc.services.agency;

import simpledoc.utilities.ValidationHandler;
import java.util.Map;
import java.util.UUID;

import simpledoc.services.ModuleObject;

public class AgentDefinition extends ModuleObject {

	private UUID category_id;
	private String definition_label;
	private String definition_security;
	private Map<String, Object> definition_data_structure;

	public AgentDefinition(UUID definition_id, String type, Map<String, Object> object_data) {
		super(definition_id, type);

		String label = ValidationHandler.getValidStringFor("definition_label", object_data);
		UUID cat_id = ValidationHandler.getValidUUIDFor("category_id", object_data);
		String security = ValidationHandler.getValidStringFor("definition_security", object_data);
		Map<String, Object> data_structure = ValidationHandler.getValidMapFor("definition_data_structure", object_data);

		this.setDefinitionLabel(label);
		this.setCategoryId(cat_id);
		this.setDefinitionSecurity(security);
		this.setDataDefinition(data_structure);
	}

	private void setCategoryId(UUID category_id) { this.category_id = category_id; }
	public UUID getCategoryId() { return this.category_id; }

	private void setDefinitionLabel(String label) { this.definition_label = label; }
	public String getDefinitionLabel() { return this.definition_label; }

	private void setDefinitionSecurity(String security_setting) { this.definition_security = security_setting; }
	public String getDefinitionSecurity() { return this.definition_security; }

	private void setDataDefinition(Map<String, Object> data_structure) { this.definition_data_structure = data_structure; }
	public Map<String, Object> getDataDefinition() { return this.definition_data_structure; }

}
