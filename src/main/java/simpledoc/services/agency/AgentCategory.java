package simpledoc.services.agency;


import java.util.Collections;
import java.util.Set;
import simpledoc.exceptions.ServiceErrorException;
import java.util.Map;
import java.util.UUID;

import simpledoc.services.ModuleObject;

public class AgentCategory extends ModuleObject {

	private String category_label;
	private String category_behavior;
	private String category_security;
	private Map<String, String> category_data_structure;


	AgentCategory(UUID category_id, String type, Map<String, Object> object_data) throws ServiceErrorException {
		super(category_id, type);

		//need to validate each value of object_data prior to setting it
		//		if any validation errors, throw ServiceErrorException
		String label = null; /*set a limit on length of string*/
		String behavior = null; /*shoule be either "STRUCTURAL" or "ACTOR" */
		String security = null; /*should be a four digit integer, each digit from 1-4*/
		Map<String, String> data_structure = null; /*limit length of key, value should represent the value type of key*/

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


	private void setCategoryDataDef(Map<String, String> data_definition) { this.category_data_structure = data_definition; }
	public Map<String, String> getDataDefinition() { return this.category_data_structure; }


	public static Set<String> getKeySet(){
		Set<String> key_set = Collections.emptySet();

		key_set.add("category_label");
		key_set.add("category_behavior");
		key_set.add("category_security");
		key_set.add("category_data_structure");

		return key_set;

	}

}
