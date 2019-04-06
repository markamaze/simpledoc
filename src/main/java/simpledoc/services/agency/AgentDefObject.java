package simpledoc.services.agency;

import java.sql.SQLException;
import java.sql.SQLInput;
import java.sql.SQLOutput;
import java.util.Map;
import simpledoc.services.ModuleObject;

public class AgentDefObject extends ModuleObject {

	private String category_id;
	private String definition_label;
	private String definition_security;
	private Map<String, Object> definition_data_def;
	
	private String sql_type;

	public AgentDefObject(String definition_id, String object_type) { 
		super(definition_id, object_type); 
		this.sql_type = "agency.AGENCY_DEFINITION";
	}

	public void setCategoryId(String category_id) { this.category_id = category_id; }
	public String getCategoryId() { return this.category_id; }

	public void setDefinitionLabel(String label) { this.definition_label = label; }
	public String getDefinitionLabel() { return this.definition_label; }

	public void setDefinitionSecurity(String security_setting) { this.definition_security = security_setting; }
	public String getDefinitionSecurity() { return this.definition_security; }


	public void setCategoryDataDef(Map<String, Object> data_definition) { this.definition_data_def = data_definition; }
	private void setCategoryDataDef(String readString) {
		// TODO Auto-generated method stub
	}
	public Map<String, Object> getDataDefinition() { return this.definition_data_def; }


	@Override
	public String getSQLTypeName() throws SQLException { return this.sql_type; }

	@Override
	public void readSQL(SQLInput stream, String typeName) throws SQLException {
		this.sql_type = typeName;
		this.setId(stream.readString());
		this.setModuleObjectType(stream.readString());
		this.setCategoryId(stream.readString());
		this.setDefinitionLabel(stream.readString());
		this.setDefinitionSecurity(stream.readString());
		this.setCategoryDataDef(stream.readString());
	}

	@Override
	public void writeSQL(SQLOutput stream) throws SQLException {
		stream.writeString(this.getId());
		stream.writeString(this.getModuleObjectType());
		stream.writeString(this.getCategoryId());
		stream.writeString(this.getDefinitionLabel());
		stream.writeString(this.getDefinitionSecurity());
		stream.writeString(this.getDataDefinition().toString());
	}

}
