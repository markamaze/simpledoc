package simpledoc.services.agency;

import java.util.Map;
import java.util.HashMap;
import simpledoc.utilities.ValidationObject;
import java.util.UUID;
import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;

public class AgentDefinition extends ModuleObject {

	private UUID category_id;
	private String definition_label;
	private String definition_security;
	private Map<String, Object> definition_data_structure;

	public AgentDefinition(UUID definition_id, String type, Map<String, Object> object_data) throws ServiceErrorException {
		super(definition_id, type);

		ValidationObject valid_data = validateData(object_data);
		if(!valid_data.isValid())
			throw new ServiceErrorException("object data not valid for object type AgentDefinition");

		String label = (String) object_data.get("definition_label");
		UUID cat_id = (UUID) object_data.get("category_id");
		String security = (String) object_data.get("definition_security");
		Map<String, Object> data_structure = (Map<String, Object>) object_data.get("definition_data_structure");

		this.setDefinitionLabel(label);
		this.setCategoryId(cat_id);
		this.setDefinitionSecurity(security);
		this.setDataDefinition(data_structure);
	}

	public static ValidationObject validateData(Map<String, Object> data){
		AgencyValidator validator = new AgencyValidator();
		Map<String, ValidationObject> validated_data = null;
		try{
			ValidationObject label = validator.validateObjectAs(data.get("definition_label"), String.class);
			ValidationObject category_id = validator.validateObjectAs(data.get("category_id"), UUID.class);
			ValidationObject security = validator.validateObjectAs(data.get("definition_security"), String.class);
			ValidationObject data_structure = validator.validateObjectAs(data.get("definition_data_structure"), Map.class);

			if( label.isValid()
					&& category_id.isValid()
					&& security.isValid()
					&& data_structure.isValid()) {
						validated_data = new HashMap<>();
						validated_data.put("definition_label", label);
						validated_data.put("category_id", category_id);
						validated_data.put("definition_security", security);
						validated_data.put("data_structure", data_structure);
					}
		} catch (Exception e) { e.printStackTrace(); }


		return new ValidationObject(validated_data, Map.class);
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
