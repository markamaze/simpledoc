package simpledoc.services.agency;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Set;
import simpledoc.exceptions.ServiceErrorException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.json.JSONObject;
import org.postgresql.jdbc.PgArray;

import java.util.UUID;

import simpledoc.services.ModuleObject;

public class AgentTemplate extends ModuleObject {

	private String agentTemplate_label;
	private Set<UUID> agentTemplate_dataTag_ids;


	AgentTemplate(String id, String type) { super(id, type); }
	AgentTemplate(String string, String type, Map<String, Object> data) throws ServiceErrorException, SQLException {
		super(string, type);
		setLabel(data.get("agentTemplate_label"));
		setDataTagIds(data.get("agentTemplate_dataTag_ids"));
	}
	

	private void setLabel(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateString(object, 1, 48, true, true))
			this.agentTemplate_label = object.toString();
		else throw new ServiceErrorException("invalid property for AgentTemplate.agentTemplate_label");
	}
	private void setDataTagIds(Object object) throws ServiceErrorException, SQLException {
		List<UUID> tagsList = new ArrayList<UUID>();
		
		if(object == null) this.agentTemplate_dataTag_ids = new HashSet<UUID>(tagsList);
		else if(object instanceof UUID[]) {
			tagsList = Arrays.asList((UUID[])object);
			this.agentTemplate_dataTag_ids = new HashSet<UUID>(tagsList);
		}		
		else if(object instanceof ArrayList) {
			for(Object id : (ArrayList<?>) object) {
				  UUID uuid = AgencyValidator.validateUUIDString(id);
				if(uuid != null) tagsList.add(uuid);
				else throw new ServiceErrorException("invalid id in dataTag list");
			}
			this.agentTemplate_dataTag_ids = new HashSet<UUID>(tagsList);
		}
		else if(object instanceof PgArray) 
			this.agentTemplate_dataTag_ids = new HashSet<UUID>(Arrays.asList((UUID[])((PgArray)object).getArray()));
		else throw new ServiceErrorException("invalid property AgentTemplate.agentTemplate_dataTag_ids");
	}

	public String getLabel() { return this.agentTemplate_label; }
	public Set<UUID> getDataTagIds() { return this.agentTemplate_dataTag_ids; }

	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException, SQLException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			if(key.equals("agentTemplate_label")) setLabel(value);
			else if(key.equals("agentTemplate_dataTag_ids")) setDataTagIds(value);
		}
		return true;
	}
	
	
	@Override
	public boolean readStorageResult(ResultSet rs) throws SQLException, ServiceErrorException {
		setLabel(rs.getString("agentTemplate_label"));
		setDataTagIds(rs.getArray("agentTemplate_dataTag_ids"));
		return true;
	}
	
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException, SQLException {
		PreparedStatement statement = null;

		if(type.equals("create")) statement = connection.prepareStatement("call agency.create_agentTemplate(?,?,?)");
		else if(type.equals("update")) statement = connection.prepareStatement("call agency.update_agentTemplate(?,?,?)");
					
		UUID uuid;
		if(this.getId().startsWith("n-")) uuid = AgencyValidator.validateUUIDString(this.getId().substring(2));
		else uuid = AgencyValidator.validateUUIDString(this.getId());
		
		statement.setObject(1, uuid);
		statement.setString(2, this.getLabel());
		statement.setArray(3, connection.createArrayOf("UUID", this.getDataTagIds().toArray()));


		return statement;
	}
	
	
	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("agentTemplate_label", this.getLabel());
		json_result.put("agentTemplate_dataTag_ids", this.getDataTagIds());
		
		return json_result.toString();
	}

}
