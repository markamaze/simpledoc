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

public class Template extends ModuleObject {

	private String label;
	private Set<UUID> tag_ids;


	Template(String id, String type) { super(id, type); }
	Template(String string, String type, Map<String, Object> data) throws ServiceErrorException, SQLException {
		super(string, type);
		setLabel(data.get("label"));
		setTagIds(data.get("tag_ids"));
	}
	

	private void setLabel(Object object) throws ServiceErrorException {
		if(AgencyValidator.validateString(object, 1, 48, true, true))
			this.label = object.toString();
		else throw new ServiceErrorException("invalid property for Template.label");
	}
	private void setTagIds(Object object) throws ServiceErrorException, SQLException {
		Set<UUID> tagIds = new HashSet<UUID>();
		
		if(object == null) this.tag_ids = tagIds;
		else if(object instanceof PgArray) {
			JSONArray asJson = new JSONArray(((PgArray)object).getArray());
			for(Object tagId : asJson) {
				UUID id = AgencyValidator.validateUUIDString(tagId);
				if(id == null) throw new ServiceErrorException("invalid id in property: Agency.Template.tag_ids");
				else tagIds.add(id);
			}
			this.tag_ids = tagIds;
		}		
		else if(object instanceof ArrayList) {
			for(Object tagId : (ArrayList<?>) object) {
				UUID id = AgencyValidator.validateUUIDString(tagId);
				if(id == null) throw new ServiceErrorException("invalid id in tag list");
				else tagIds.add(id);
			}
			this.tag_ids = tagIds;
		}
		else throw new ServiceErrorException("invalid property Template.tag_ids");
	}

	public String getLabel() { return this.label; }
	public Set<UUID> getTagIds() { return this.tag_ids; }

	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException, SQLException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			if(key.equals("label")) setLabel(value);
			else if(key.equals("tag_ids")) setTagIds(value);
		}
		return true;
	}
	
	
	@Override
	public boolean readStorageResult(ResultSet rs) throws SQLException, ServiceErrorException {
		setLabel(rs.getString("label"));
		setTagIds(rs.getArray("tag_ids"));
		return true;
	}
	
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException, SQLException {
		PreparedStatement statement = null;

		if(type.equals("create")) statement = connection.prepareStatement("call agency.create_template(?,?,?)");
		else if(type.equals("update")) statement = connection.prepareStatement("call agency.update_template(?,?,?)");
					
		UUID uuid = AgencyValidator.validateUUIDString(this.getId());
		
		statement.setObject(1, uuid);
		statement.setString(2, this.getLabel());
		statement.setArray(3, connection.createArrayOf("UUID", this.getTagIds().toArray()));

		return statement;
	}
	
	
	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("label", this.getLabel());
		json_result.put("tag_ids", this.getTagIds());
		
		return json_result.toString();
	}

}
