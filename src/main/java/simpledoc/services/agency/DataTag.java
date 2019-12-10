package simpledoc.services.agency;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import simpledoc.exceptions.ServiceErrorException;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import simpledoc.services.ModuleObject;

public class DataTag extends ModuleObject {

	private String dataTag_label;
	private Boolean dataTag_for_agent;

	DataTag(UUID id, String type) {	super(id, type); }
	DataTag(UUID tag_id, String type, Map<String, Object> data) throws ServiceErrorException {
		super(tag_id, type);
		setDataTagLabel(data.get("dataTag_label").toString());
		setIfTagForAgent(Boolean.getBoolean(data.get("dataTag_for_agent").toString()));
	}

	
	private void setIfTagForAgent(Object object) throws ServiceErrorException {
		if(object instanceof Boolean) this.dataTag_for_agent = (Boolean) object;
		else throw new ServiceErrorException("invalid arg for if tag is for an agent");
	}
	private void setDataTagLabel(String label) throws ServiceErrorException {
		if(AgencyValidator.validateString(label, 1, 48, true, true)) 
			this.dataTag_label = label;
		else throw new ServiceErrorException("invalid label for data tag");
		
	}

	public String getLabel() { return this.dataTag_label; }
	public Boolean isForAgent() { return this.dataTag_for_agent; }
	
	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry : objectData.entrySet()) {
			switch(entry.getKey()) {
			case "dataTag_label":
				setDataTagLabel(entry.getValue().toString());
				break;
			case "dataTag_for_agent":
				setIfTagForAgent(entry.getValue());
				break;
			}
		}
		
		return true;
	}


	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException, SQLException {
		setDataTagLabel(rs.getString("dataTag_label"));
		setIfTagForAgent(rs.getBoolean("dataTag_for_agent"));
		return true;
	}
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
		PreparedStatement statement = null;
		try {
			switch(type) {
			case "create":
				statement = connection.prepareStatement("call agency.create_dataTag(?,?,?)");
				break;
			case "update":
				statement = connection.prepareStatement("call agency.update_dataTag(?,?,?)");
				break;
			}
			statement.setObject(1, this.getId());
			statement.setString(2, this.getLabel());
			statement.setBoolean(3, this.isForAgent());
		} catch(SQLException err) { throw new ServiceErrorException("could not write storage statement"); }
		
		return statement;
	}
	
	
	@Override
	public String writeToJson() {
		// TODO Auto-generated method stub
		return null;
	}

}
