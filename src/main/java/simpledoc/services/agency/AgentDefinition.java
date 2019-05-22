package simpledoc.services.agency;

import java.util.Set;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;
import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;

public class AgentDefinition extends ModuleObject {

	private UUID category_id;
	private String definition_label;
	private String definition_security;
	private Map<String, String> definition_data_structure;


	AgentDefinition(UUID definition_id, String type, Map<String, Object> object_data) throws ServiceErrorException {
		super(definition_id, type);

		//need to validate each value of object_data prior to setting it
		//		if any validation errors, throw ServiceErrorException
		String label = null; /*set a limit on length of string*/
		UUID cat_id = null; /*assure it is a valid uuid*/
		String security = null; /*should be a four digit integer, each digit from 1-4 */
		Map<String, String> data_structure = null; /*limit length of key, value should represent the value type of key*/

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


	private void setDataDefinition(Map<String, String> data_structure) { this.definition_data_structure = data_structure; }
	public Map<String, String> getDataDefinition() { return this.definition_data_structure; }

	public static Set<String> getKeySet(){
		Set<String> key_set = Collections.emptySet();

		key_set.add("definition_label");
		key_set.add("category_id");
		key_set.add("definition_security");
		key_set.add("definition_data_structure");

		return key_set;
	}
}
