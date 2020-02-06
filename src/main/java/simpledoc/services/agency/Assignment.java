package simpledoc.services.agency;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;
import java.util.UUID;
import java.util.Map.Entry;

import org.json.JSONObject;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;

public class Assignment extends ModuleObject {
	private UUID agentTemplate_id;
	private UUID supervising_assignment_id;

	public Assignment(UUID uuid, String type) { super(uuid, type); }
	public Assignment(UUID uuid, String type, Map<String, Object> data) throws ServiceErrorException {
		super(uuid, type);
		setAgentTemplateId(data.get("agentTemplate_id"));
		setSupervisingAssignmentId(data.get("supervising_assignment_id"));
	}
	
	private void setAgentTemplateId(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateUUIDString(object)) this.agentTemplate_id = UUID.fromString(object.toString());
		else throw new ServiceErrorException("invalid id set for Assignment.agentTemplate_id");
	}
	private void setSupervisingAssignmentId(Object object) throws ServiceErrorException {
		if(object == null) this.supervising_assignment_id = null;
		else if(AgencyValidator.validateUUIDString(object)) this.supervising_assignment_id = UUID.fromString(object.toString());
		else throw new ServiceErrorException("invalid id set for Assignment.supervising_assignment_id");	
	}
	
	public UUID getAgentTemplateId() { return this.agentTemplate_id; }
	public UUID getSupervisingAssignmentId() { return this.supervising_assignment_id; }

	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			if(key.equals("agentTemplate_id")) setAgentTemplateId(value);
			else if(key.equals("supervising_assignment_id")) setSupervisingAssignmentId(value);
		}
		return true;
	}

	@Override
	public boolean readStorageResult(ResultSet rs) throws SQLException, ServiceErrorException {
		setAgentTemplateId(rs.getObject("agentTemplate_id"));
		setSupervisingAssignmentId(rs.getObject("supervising_assignment_id"));
		return true;
	}

	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException, SQLException {
		PreparedStatement statement = null;
		
		if(type.equals("create")) statement = connection.prepareStatement("call agency.create_assignment(?,?,?)");
		else if(type.equals("update")) statement = connection.prepareStatement("call agency.update_assignment(?,?,?)");
		
		statement.setObject(1, this.getId());
		statement.setObject(2, this.getAgentTemplateId());
		statement.setObject(3, this.getSupervisingAssignmentId());
			
		return statement;
	}

	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("agentTemplate_id", this.getAgentTemplateId());
		json_result.put("supervising_assignment_id", this.getSupervisingAssignmentId());
		
		return json_result.toString();

	}

}
