package simpledoc.services.agency;


import simpledoc.utilities.ValidationHandler;
import java.util.Map;
import java.util.UUID;

import simpledoc.services.ModuleObject;

public class AgentCategory extends ModuleObject {

	private String category_label;
	private String category_behavior;
	private String category_security;
	private Map<String, Object> category_data_structure;


	public AgentCategory(UUID category_id, String type, Map<String, Object> object_data){
		super(category_id, type);

		String label = ValidationHandler.getValidStringFor("category_label", object_data);
		String behavior = ValidationHandler.getValidStringFor("category_behavior", object_data);
		String security = ValidationHandler.getValidStringFor("category_behavior", object_data);
		Map<String, Object> data_structure = ValidationHandler.getValidMapFor("category_data_structure", object_data);

		this.setCategoryLabel(label);
		this.setCategoryBehavior(behavior);
		this.setCategorySecurity(security);
		this.setCategoryDataDef(data_structure);
	}

	private void setCategoryLabel(String label) { this.category_label = label; }
	public String getCategoryLabel() { return this.category_label; }

	private void setCategoryBehavior(String type) { this.category_behavior = type; }
	public String getCategoryBehavior() { return this.category_behavior; }

	private void setCategorySecurity(String security_setting) { this.category_security = security_setting; }
	public String getCategorySecurity() {return this.category_security; }

	private void setCategoryDataDef(Map<String, Object> data_definition) { this.category_data_structure = data_definition; }
	public Map<String, Object> getDataDefinition() { return this.category_data_structure; }

}
