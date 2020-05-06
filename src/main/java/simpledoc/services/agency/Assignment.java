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
	private UUID supervisor_for_structuralNode_id;
	private UUID assignment_for_structuralNode_id;

	public Assignment(String uuid, String type) { super(uuid, type); }
	public Assignment(String string, String type, Map<String, Object> data) throws ServiceErrorException {
		super(string, type);
		setAgentTemplateId(data.get("agentTemplate_id"));
		setSupervisingAssignmentId(data.get("supervising_assignment_id"));
		setSupervisorForNodeId(data.get("supervisor_for_structuralNode_id"));
		setAssignmentForNodeId(data.get("assignment_for_structuralNode_id"));
	}
	
	private void setAssignmentForNodeId(Object object) {
		// TODO Auto-generated method stub
		
	}
	private void setSupervisorForNodeId(Object object) {
		// TODO Auto-generated method stub
		
	}
	private void setAgentTemplateId(Object object) throws ServiceErrorException {
		UUID uuid = AgencyValidator.validateUUIDString(object);
		if(uuid != null) this.agentTemplate_id = uuid;
		else throw new ServiceErrorException("invalid id set for Assignment.agentTemplate_id");
	}
	private void setSupervisingAssignmentId(Object object) throws ServiceErrorException {
		UUID uuid = AgencyValidator.validateUUIDString(object);

		if(object == null) this.supervising_assignment_id = null;
		else if(uuid != null) this.supervising_assignment_id = uuid;
		else throw new ServiceErrorException("invalid id set for Assignment.supervising_assignment_id");	
	}
	
	public UUID getAgentTemplateId() { return this.agentTemplate_id; }
	public UUID getSupervisingAssignmentId() { return this.supervising_assignment_id; }
	public UUID getSupervisorForNodeId() { return this.supervisor_for_structuralNode_id; }
	public UUID getAssignmentForNodeId() { return this.assignment_for_structuralNode_id; }
	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			if(key.equals("agentTemplate_id")) setAgentTemplateId(value);
			else if(key.equals("supervising_assignment_id")) setSupervisingAssignmentId(value);
			else if(key.equals("supervisor_for_structuralNode_id")) setSupervisorForNodeId(value);
			else if(key.equals("assignment_for_structuralNode_id")) setAssignmentForNodeId(value);
		}
		return true;
	}

	@Override
	public boolean readStorageResult(ResultSet rs) throws SQLException, ServiceErrorException {
		setAgentTemplateId(rs.getObject("agentTemplate_id"));
		setSupervisingAssignmentId(rs.getObject("supervising_assignment_id"));
		setSupervisorForNodeId(rs.getObject("supervisor_for_structuralNode_id"));
		setAssignmentForNodeId(rs.getObject("assignment_for_structuralNode_id"));
		return true;
	}

	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException, SQLException {
		PreparedStatement statement = null;
		
		if(type.equals("create")) statement = connection.prepareStatement("call agency.create_assignment(?,?,?,?,?)");
		else if(type.equals("update")) statement = connection.prepareStatement("call agency.update_assignment(?,?,?,?,?)");
		
		UUID uuid;
		if(this.getId().startsWith("n-")) uuid = AgencyValidator.validateUUIDString(this.getId().substring(2));
		else uuid = AgencyValidator.validateUUIDString(this.getId());
		
		statement.setObject(1, uuid);
		statement.setObject(2, this.getAgentTemplateId());
		statement.setObject(3, this.getSupervisingAssignmentId());
		statement.setObject(4, this.getSupervisorForNodeId());
		statement.setObject(5, this.getAssignmentForNodeId());
			
		return statement;
	}

	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("agentTemplate_id", this.getAgentTemplateId());
		json_result.put("supervising_assignment_id", this.getSupervisingAssignmentId());
		json_result.put("supervisor_for_structuralNode_id", this.getSupervisorForNodeId());
		json_result.put("assignment_for_structuralNode_id", this.getAssignmentForNodeId());
		
		return json_result.toString();

	}

}
