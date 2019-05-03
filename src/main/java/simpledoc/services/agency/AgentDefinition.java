package simpledoc.services.agency;

import java.util.Map;
import simpledoc.services.ModuleObject;

public class AgentDefinition extends ModuleObject {

	private String category_id;
	private String definition_label;
	private String definition_security;
	private Map<String, Object> definition_data_def;
	
	public AgentDefinition(String definition_id, String object_type) { 
		super(definition_id, object_type);
	}

	public void setCategoryId(String category_id) { this.category_id = category_id; }
	public String getCategoryId() { return this.category_id; }

	public void setDefinitionLabel(String label) { this.definition_label = label; }
	public String getDefinitionLabel() { return this.definition_label; }

	public void setDefinitionSecurity(String security_setting) { this.definition_security = security_setting; }
	public String getDefinitionSecurity() { return this.definition_security; }


	public void setCategoryDataDef(Map<String, Object> data_definition) { this.definition_data_def = data_definition; }
	public Map<String, Object> getDataDefinition() { return this.definition_data_def; }

}
