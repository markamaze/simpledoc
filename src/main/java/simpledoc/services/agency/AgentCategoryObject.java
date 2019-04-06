package simpledoc.services.agency;

import java.sql.SQLException;
import java.sql.SQLInput;
import java.sql.SQLOutput;
import java.util.Map;

import simpledoc.services.ModuleObject;

public class AgentCategoryObject extends ModuleObject {

	
	private String category_label;
	private String category_behavior;
	private String category_security;
	private Map<String, Object> category_data_def;
	
	private String sql_type;

	public AgentCategoryObject(String category_id, String object_type) { 
		super(category_id, object_type); 
		this.sql_type = "AGENCY.AGENCY_CATEGORY";
	}

	public void setCategoryLabel(String label) { this.category_label = label; }
	public String getCategoryLabel() { return this.category_label; }

	public void setCategoryBehavior(String type) { this.category_behavior = type; }
	public String getCategoryBehavior() { return this.category_behavior; }
	
	public void setCategorySecurity(String security_setting) { this.category_security = security_setting; }
	public String getCategorySecurity() {return this.category_security; }

	public void setCategoryDataDef(Map<String, Object> data_definition) { this.category_data_def = data_definition; }
	private void setCategoryDataDef(String readString) {}
	public Map<String, Object> getDataDefinition() {	return this.category_data_def; }

	@Override
	public String getSQLTypeName() throws SQLException { return this.sql_type; }

	@Override
	public void readSQL(SQLInput stream, String typeName) throws SQLException {
		this.sql_type = typeName;
		this.setId(stream.readString());
		this.setModuleObjectType(stream.readString());
		this.setCategoryLabel(stream.readString());
		this.setCategoryBehavior(stream.readString());
		this.setCategorySecurity(stream.readString());
		this.setCategoryDataDef(stream.readString());
	}

	@Override
	public void writeSQL(SQLOutput stream) throws SQLException {
		stream.writeString(this.getId());
		stream.writeString(this.getModuleObjectType());
		stream.writeString(this.getCategoryLabel());
		stream.writeString(this.getCategoryBehavior());
		stream.writeString(this.getCategorySecurity());
		stream.writeString(this.getDataDefinitionAsString());
	}

	private String getDataDefinitionAsString() {
		return "";
	}

}
