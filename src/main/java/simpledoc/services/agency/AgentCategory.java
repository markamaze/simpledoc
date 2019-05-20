package simpledoc.services.agency;


import java.util.HashMap;
import simpledoc.exceptions.ServiceErrorException;
import simpledoc.utilities.ValidationObject;
import java.util.Map;
import java.util.UUID;

import simpledoc.services.ModuleObject;

public class AgentCategory extends ModuleObject {

	private String category_label;
	private String category_behavior;
	private String category_security;
	private Map<String, Object> category_data_structure;


	AgentCategory(UUID category_id, String type, Map<String, Object> object_data) throws ServiceErrorException {
		super(category_id, type);

		ValidationObject valid_data = validateData(object_data);
		if(!valid_data.isValid())
			throw new ServiceErrorException("object data not valid for object type AgentCategory");

		String label = (String) object_data.get("category_label");
		String behavior = (String) object_data.get("category_behavior");
		String security = (String) object_data.get("category_security");
		Map<String, Object> data_structure = (Map<String, Object>) object_data.get("category_data_structure");

		this.setCategoryLabel(label);
		this.setCategoryBehavior(behavior);
		this.setCategorySecurity(security);
		this.setCategoryDataDef(data_structure);
	}

	public static ValidationObject validateData(Map<String, Object> data) {
		AgencyValidator validator = new AgencyValidator();
		Map<String, ValidationObject> validated_data = null;
		try{
			ValidationObject label = validator.validateObjectAs(data.get("category_label"), String.class);
			ValidationObject behavior = validator.validateObjectAs(data.get("category_behavior"), UUID.class);
			ValidationObject security = validator.validateObjectAs(data.get("category_security"), String.class);
			ValidationObject data_structure = validator.validateObjectAs(data.get("category_data_structure"), Map.class);

			if( label.isValid()
					&& behavior.isValid()
					&& security.isValid()
					&& data_structure.isValid()) {
						validated_data = new HashMap<>();
						validated_data.put("category_label", label);
						validated_data.put("category_behavior", behavior);
						validated_data.put("category_security", security);
						validated_data.put("data_structure", data_structure);
					}
		} catch (Exception e) { e.printStackTrace(); }


		return new ValidationObject(validated_data, Map.class);

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
