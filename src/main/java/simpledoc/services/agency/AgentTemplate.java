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
import org.postgresql.util.PGobject;
import org.json.JSONArray;

import java.util.UUID;

import simpledoc.services.ModuleObject;

public class AgentTemplate extends ModuleObject {

	private String agentTemplate_label;
	private String agentTemplate_security;
	private Set<UUID> agentTemplate_dataTag_ids;
	private List<Object> agentTemplate_properties;


	AgentTemplate(UUID id, String type) { super(id, type); }
	AgentTemplate(UUID template_id, String type, Map<String, Object> data) throws ServiceErrorException {
		super(template_id, type);
		setLabel(data.get("agentTemplate_label").toString());
		setSecurity(data.get("agentTemplate_security").toString());
		setDataTagIds(data.get("agentTemplate_dataTag_ids"));
		setProperties(data.get("agentTemplate_properties"));
	}
	

	private void setProperties(Object object) throws ServiceErrorException {
		if(object instanceof PGobject) this.agentTemplate_properties = new JSONArray(((PGobject)object).getValue()).toList();
		else if(object instanceof String) this.agentTemplate_properties = new JSONArray(object).toList();
		else if(object instanceof List) this.agentTemplate_properties = (List<Object>) object;
		else if(object == null) this.agentTemplate_properties = new ArrayList<Object>();
		else throw new ServiceErrorException("invalid format for agentTemplate properties");
	}
	
	private void setDataTagIds(Object object) throws ServiceErrorException {
		List<UUID> tagsList = new ArrayList<UUID>();
		
		if(object instanceof UUID[]) {
			tagsList = Arrays.asList((UUID[])object);
			this.agentTemplate_dataTag_ids = new HashSet<UUID>(tagsList);
		}
		
		else if(object instanceof ArrayList) {
			for(Object id : (ArrayList<?>) object) {
				if(AgencyValidator.validateUUIDString(id.toString())) {
					tagsList.add(UUID.fromString(id.toString()));
				}
				else throw new ServiceErrorException("invalid id in dataTag list");
			}
			this.agentTemplate_dataTag_ids = new HashSet<UUID>(tagsList);
		}
		
		else if(object == null) this.agentTemplate_dataTag_ids = new HashSet<UUID>(tagsList);

		
		else throw new ServiceErrorException("invalid dataTag list format");
	
	}
	private void setSecurity(String security) throws ServiceErrorException {
		if(AgencyValidator.validateSecurity(security)) 
			this.agentTemplate_security = security;
		else throw new ServiceErrorException("invalid security code setting");
		
	}
	private void setLabel(String label) throws ServiceErrorException {
		if(AgencyValidator.validateString(label, 1, 48, true, true))
			this.agentTemplate_label = label;
		else throw new ServiceErrorException("invalid label for agent template");
		
	}

	public String getLabel() { return this.agentTemplate_label; }
	public String getSecurityCode() { return this.agentTemplate_security; }
	public Set<UUID> getDataTagIds() { return this.agentTemplate_dataTag_ids; }
	public List<Object> getProperties() { return this.agentTemplate_properties; }

	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			switch(entry.getKey()) {
			case "agentTemplate_label":
				setLabel(entry.getValue().toString());
				break;
			case "agentTemplate_security":
				setSecurity(entry.getValue().toString());
				break;
			case "agentTemplate_dataTag_ids":
				setDataTagIds(entry.getValue());
				break;
			case "agentTemplate_properties":
				setProperties(entry.getValue());
			}
		}
		return true;
	}
	
	
	@Override
	public boolean readStorageResult(ResultSet rs) throws SQLException, ServiceErrorException {
		setLabel(rs.getString("agentTemplate_label"));
		setSecurity(rs.getString("agentTemplate_security"));
		setDataTagIds(rs.getArray("agentTemplate_dataTag_ids").getArray());
		setProperties(rs.getObject("agentTemplate_properties"));
		return true;
	}
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
		PreparedStatement statement = null;

		try {
			switch(type) {
			case "create":
				statement = connection.prepareStatement("call agency.create_agentTemplate(?,?,?,?,?)");
				break;
			case "update":
				statement = connection.prepareStatement("call agency.update_agentTemplate(?,?,?,?,?)");
				break;
			}
			
			PGobject pgjsonObj = new PGobject();
			JSONArray arr = new JSONArray(this.getProperties());
			pgjsonObj.setType("json");
			pgjsonObj.setValue(arr.toString());
			
			statement.setObject(1, this.getId());
			statement.setString(2, this.getLabel());
			statement.setString(3, this.getSecurityCode());
			statement.setArray(4, connection.createArrayOf("UUID", this.getDataTagIds().toArray()));
			statement.setObject(5, pgjsonObj);
		}catch(SQLException err) { throw new ServiceErrorException("couldn't set storage statement object");}

		return statement;
	}
	
	
	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("agentTemplate_label", this.getLabel());
		json_result.put("agentTemplate_security", this.getSecurityCode());
		json_result.put("agentTemplate_dataTag_ids", this.getDataTagIds());
		json_result.put("agentTemplate_properties", this.getProperties());
		
		return json_result.toString();
	}

}
