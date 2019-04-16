package simpledoc.services.agency;

import java.sql.SQLException;
import java.sql.SQLInput;
import java.sql.SQLOutput;
import java.util.Map;
import simpledoc.services.ModuleObject;

public class AgencyObject extends ModuleObject {

	private String definition_id;
	private String agent_link;
	private String agent_security;
	private Map<String, Object> agent_data;
	
	private String sql_type;
	

	public AgencyObject(String agent_id, String object_type) { 
		super(agent_id, object_type); 
		this.sql_type = "agency.AGENCY_AGENT";
	}
	
	public String getDefinitionId() { return this.definition_id; }
	public void setDefinitionId(String uuid_string) { this.definition_id = uuid_string;	}
	
	public String getAgentLinkId() { return this.agent_link; }
	public void setAgentLinkId(String link_id) { this.agent_link = link_id; }
	
	public String getAgentSecurity() { return this.agent_security; }
	public void setAgentSecurity(String security_setting) { this.agent_security = security_setting; }
	
	public Map<String, Object> getAgentData() { return this.agent_data; }
	public void setAgentData(Map<String, Object> agent_data) { this.agent_data = agent_data; }
	public void setAgentData(String readString) {
		// TODO Auto-generated method stub
		//parse string parameter and load into agent_data map
	}
	
	
	
	@Override
	public String getSQLTypeName() throws SQLException { return this.sql_type; }

	@Override
	public void readSQL(SQLInput stream, String typeName) throws SQLException {
		this.sql_type = typeName;
		this.setId(stream.readString());
		this.setModuleObjectType(stream.readString());
		this.setDefinitionId(stream.readString());
		this.setAgentLinkId(stream.readString());
		this.setAgentSecurity(stream.readString());
		this.setAgentData(stream.readString());
	}

	@Override
	public void writeSQL(SQLOutput stream) throws SQLException {
		stream.writeString(this.getId());
		stream.writeString(this.getModuleObjectType());
		stream.writeString(this.getDefinitionId());
		stream.writeString(this.getAgentLinkId());
		stream.writeString(this.getAgentSecurity());
		stream.writeString(this.getAgentData().toString());
	}
	
}
