package simpledoc.services.agency;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;
import org.postgresql.jdbc.PgArray;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;

public class Role extends ModuleObject {

	private String label;
	private Set<UUID> tag_ids;
	private String role_type;


	Role(String id, String type) { super(id, type); }
	Role(String string, String type, Map<String, Object> data) throws ServiceErrorException {
		super(string, type);
		setLabel(data.get("label"));
		setTagIds(data.get("tag_ids"));
		setRoleType(data.get("role_type"));
	}
	

	private void setLabel(Object object) throws ServiceErrorException {
		if(!AgencyValidator.validateString(object, 1, 48, true, true)) throw new ServiceErrorException("invalid property: Agency.Role.label");
		this.label = (String)object;
	}
	private void setTagIds(Object object) throws ServiceErrorException {
		Set<UUID> tagIds = new HashSet<UUID>();
		
		if(object == null) this.tag_ids = tagIds;
		else if(object instanceof PgArray) { //data coming from storage
			JSONArray asJson;
			try { asJson = new JSONArray(((PgArray)object).getArray()); }
			catch(SQLException err) { throw new ServiceErrorException(String.join("could not read stored property: Agency.Role.tag_ids", err.getMessage())); }

			for(Object tagId : asJson) {
				UUID id = AgencyValidator.validateUUIDString(tagId);
				if(id == null) throw new ServiceErrorException("invalid id stored in property: Agency.Role.tag_ids");
				else tagIds.add(id);
			}
			this.tag_ids = tagIds;
		}		
		else if(object instanceof ArrayList) { //data coming from http request
			for(Object tagId : (ArrayList<?>) object) {
				UUID id = AgencyValidator.validateUUIDString(tagId);
				if(id == null) throw new ServiceErrorException("invalid id set in property: Agency.Role.tag_ids");
				else tagIds.add(id);
			}
			this.tag_ids = tagIds;
		}
		else throw new ServiceErrorException("unknown property type: Agency.Role.tag_ids");
	}
	private void setRoleType(Object object) throws ServiceErrorException {
		if(object == null) throw new ServiceErrorException("missing required property: Agency.Role.role_type");

		String roleType = AgencyValidator.roleType(object);

		if(roleType == null) throw new ServiceErrorException("unknown property type: Agency.Role.role_type");
		this.role_type = roleType;
	}
	public String getLabel() { return this.label; }
	public Set<UUID> getTagIds() { return this.tag_ids; }
	public String getRoleType() { return this.role_type; }
	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			switch(key){
				case "label": setLabel(value); break;
				case "tag_ids": setTagIds(value); break;
				case "role_type": setRoleType(value); break;
				default: throw new ServiceErrorException("attempting to update unknown property: Agency.Role");
			}
		}
		return true;
	}
	
	
	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException {
		try {
			setLabel(rs.getString("label"));
			setTagIds(rs.getArray("tag_ids"));
			setRoleType(rs.getString("role_type"));
		} catch(SQLException err) { throw new ServiceErrorException(String.join("could not read stored data: Agent.Role",err.getMessage())); }

		return true;
	}
	
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
		PreparedStatement statement = null;
		try {
			if(type.equals("create")) statement = connection.prepareStatement("call agency.create_role(?,?,?,?)");
			else if(type.equals("update")) statement = connection.prepareStatement("call agency.update_role(?,?,?,?)");
						
			UUID uuid = AgencyValidator.validateUUIDString(this.getId());
			
			statement.setObject(1, uuid);
			statement.setString(2, this.getLabel());
			statement.setArray(3, connection.createArrayOf("UUID", this.getTagIds().toArray()));
			statement.setString(4, this.getRoleType());
		} catch(SQLException err) { throw new ServiceErrorException(String.join("could not write storage object: Agent.Role", err.getMessage())); }
		return statement;
	}
	
	
	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("label", this.getLabel());
		json_result.put("tag_ids", this.getTagIds());
		json_result.put("role_type", this.getRoleType());
		
		return json_result.toString();
	}

}
