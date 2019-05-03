package simpledoc.services.agency;

import java.util.Map;

import simpledoc.services.ModuleObject;

public class AgentCategory extends ModuleObject {

	
	private String category_label;
	private String category_behavior;
	private String category_security;
	private Map<String, Object> category_data_def;
	
	public AgentCategory(String category_id, String object_type) { 
		super(category_id, object_type);
	}

	public void setCategoryLabel(String label) { this.category_label = label; }
	public String getCategoryLabel() { return this.category_label; }

	public void setCategoryBehavior(String type) { this.category_behavior = type; }
	public String getCategoryBehavior() { return this.category_behavior; }
	
	public void setCategorySecurity(String security_setting) { this.category_security = security_setting; }
	public String getCategorySecurity() {return this.category_security; }

	public void setCategoryDataDef(Map<String, Object> data_definition) { this.category_data_def = data_definition; }
	public Map<String, Object> getDataDefinition() { return this.category_data_def; }

}
