package simpledoc.services.agency;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;
import org.postgresql.jdbc.PgArray;

import simpledoc.exceptions.ServiceErrorException;
import simpledoc.services.ModuleObject;

public class Node extends ModuleObject {

	private String label;
	private UUID parent_id;
	private Set<UUID> tag_ids;
	private Set<String> property_values;
	private Set<Map<String,Object>> assignments;
	

	Node(String id, String type) { super(id, type); }
	Node(String string, String type, Map<String, Object> data) throws ServiceErrorException {
		super(string, type);
		setNodeLabel(data.get("label"));
		setParentId(data.get("parent_id"));
		setTagIds(data.get("tag_ids"));
		setPropertyValues(data.get("property_values"));
		setAssignments(data.get("assignments"));
	}

	
	private void setNodeLabel(Object object) throws ServiceErrorException {
		if(!AgencyValidator.validateString(object, 1, 48, true, true)) throw new ServiceErrorException("invalid property: Agency.Node.label");
		this.label = (String)object; 
	}
	private void setParentId(Object object) throws ServiceErrorException {
		UUID id = AgencyValidator.validateUUIDString(object);
		if(id == null) throw new ServiceErrorException("invalid property: Agency.Node.parent_id");
		else this.parent_id = id;
	}
	private void setTagIds(Object object) throws ServiceErrorException {
		Set<UUID> tagIds = new HashSet<UUID>();
		
		if(object == null) this.tag_ids = tagIds;

		else if(object instanceof ArrayList) { //data coming from http request
			for(Object tagId : (ArrayList<?>) object) {
				UUID id = AgencyValidator.validateUUIDString(tagId);
				if(id == null) throw new ServiceErrorException("invalid item in property: Agency.Node.tag_ids");
				else tagIds.add(id);
			}
			this.tag_ids = tagIds;
		}

		else if(object instanceof PgArray){ //data coming from storage
			JSONArray asJson;
			try{ asJson = new JSONArray(((PgArray)object).getArray()); }
			catch(SQLException err) { throw new ServiceErrorException(String.join("could not read stored property: Agency.Node.tag_ids", err.getMessage())); }

			for(Object id : asJson){
				UUID tagId = AgencyValidator.validateUUIDString(id);
				if(tagId == null) throw new ServiceErrorException("invalid item in stored property: Agency.Node.tag_ids");
				else tagIds.add(tagId);
			}
			this.tag_ids = tagIds;
		}		

		else throw new ServiceErrorException("invalid property Agency.Node.tag_ids");
	}
	private void setPropertyValues(Object object) throws ServiceErrorException {
		Set<String> propertyValues = new HashSet<String>();

		if(object instanceof ArrayList){ //data coming from http request
			for(Object item: (ArrayList<?>)object){
				String valueString = AgencyValidator.propertyValues(item);
				if(valueString == null) throw new ServiceErrorException("invalid item in requested property: Agency.Node.property_values");
				else propertyValues.add(valueString);
			}
			this.property_values = propertyValues;
		}
		else if(object instanceof PgArray){ //data coming from storage
			JSONArray asJson;
			try{ asJson = new JSONArray( ((PgArray)object).getArray() ); }
			catch(SQLException err) { throw new ServiceErrorException(String.join("could not read stored property: Agency.Node.property_values", err.getMessage())); }

			for(Object item : asJson){
				String valueString = AgencyValidator.propertyValues(item);
				if(valueString == null) throw new ServiceErrorException("invalid item stored in property: Agency.Node.property_values");
				else propertyValues.add(valueString);
			}
			this.property_values = propertyValues;
		}
		else throw new ServiceErrorException("invalid item in property: Agency.Node.property_values");

	}
	private void setAssignments(Object object) throws ServiceErrorException {
		Set<Map<String, Object>> assignments = new HashSet<Map<String, Object>>();

		if(object instanceof HashMap) { //data coming from http request
			for(Object assignment : ((HashMap<?,?>)object).entrySet()) {
				Map<String, Object> valid_assignment = AgencyValidator.assignmentObject(assignment);
				
				if(valid_assignment == null) throw new ServiceErrorException("invalid item in requested property: Agency.Node.assignments");
				else assignments.add(valid_assignment);
			}

			this.assignments = assignments;
		}

		else if(object instanceof PgArray) { //data coming from storage
			JSONArray asJson;
			try { asJson = new JSONArray(((PgArray)object).getArray()); }
			catch(SQLException err) { throw new ServiceErrorException(String.join("could not read stored property: Agency.Node.assignments", err.getMessage())); }

			for(Object assignment : asJson.toList()) {
				Map<String, Object> valid_assignment = AgencyValidator.assignmentObject(assignment);
				
				if(valid_assignment == null) throw new ServiceErrorException("invalid item stored in property: Agency.Node.assignments");
				else assignments.add(valid_assignment);
			}
			this.assignments = assignments;
		}
		
		else throw new ServiceErrorException("invalid item in property: Agency.Node.assignments");
	}
	

	public String getNodeLabel() { return this.label; }
	public UUID getParentId() { return this.parent_id; }
	public Set<UUID> getTagIds() { return this.tag_ids; }
	public Set<String> getPropertyValues() { return this.property_values; }
	public Set<Map<String, Object>> getAssignments() { return this.assignments; }

	
	@Override
	public boolean update(Map<String, Object> objectData) throws ServiceErrorException {
		for(Entry<String, Object> entry: objectData.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			
			switch(key){
				case "label": setNodeLabel(value); break;
				case "parent_id": setParentId(value); break;
				case "tag_ids": setTagIds(value); break;
				case "property_values": setPropertyValues(value); break;
				case "assignments": setAssignments(value); break;
				default: throw new ServiceErrorException("attempting to update unknown property: Agency.Node");
			}
		}
		return true;
	}
	
	
	@Override
	public boolean readStorageResult(ResultSet rs) throws ServiceErrorException {
		try {
			setNodeLabel(rs.getString("label"));
			setParentId(rs.getObject("parent_id"));
			setTagIds(rs.getArray("tag_ids"));
			setPropertyValues(rs.getArray("property_values"));
			setAssignments(rs.getArray("assignments"));
		} catch(SQLException err) { throw new ServiceErrorException(String.join("could not read stored data: Agent.Node",err.getMessage())); }

		return true;
	}
	@Override
	public PreparedStatement writeStorageStatement(String type, Connection connection) throws ServiceErrorException {
		PreparedStatement statement = null;
		
		try{
			if(type.equals("create")) statement = connection.prepareStatement("call agency.create_Node(?,?,?,?,?,?)");
			else if(type.equals("update")) statement = connection.prepareStatement("call agency.update_Node(?,?,?,?,?,?)");
				
			// PGobject propertiesPG = new PGobject();
			// JSONObject jsonPropertyValues = new JSONObject(this.getPropertyValues());
			// propertiesPG.setType("json");
			// propertiesPG.setValue(jsonPropertyValues.toString());
				
			// PGobject assignmentsPG = new PGobject();
			// JSONArray jsonAssignments = new JSONArray(this.getAssignments());
			
			// assignmentsPG.setType("json");
			// assignmentsPG.setValue(jsonAssignments.toString());
				
			UUID uuid = AgencyValidator.validateUUIDString(this.getId());
			
			statement.setObject(1, uuid);
			statement.setString(2, this.getNodeLabel());
			statement.setObject(3, this.getParentId());
			statement.setArray(4, connection.createArrayOf("UUID", this.getTagIds().toArray()));
			statement.setArray(5, connection.createArrayOf("TEXT", this.getPropertyValues().toArray()));
			statement.setArray(6, connection.createArrayOf("JSON", this.getAssignments().toArray()));
		} catch(SQLException err) { throw new ServiceErrorException(String.join("could not write storage object: Agent.Node", err.getMessage())); }

		return statement;
	}


	@Override
	public String writeToJson() {
		JSONObject json_result = new JSONObject();
		json_result.put("id", this.getId());
		json_result.put("type", this.getModuleObjectType());
		json_result.put("label", this.getNodeLabel());
		json_result.put("parent_id", this.getParentId());
		json_result.put("tag_ids", this.getTagIds());
		json_result.put("property_values", this.getPropertyValues());


		//assignments within the node are handled as a set in server,
		//	but in client are an object where key is the assignment id
		Set<Map<String, Object>> assignments = this.getAssignments();
		Map<String, Map<String, Object>> assignmentsObject = new HashMap<>();

		for(Map<String,Object> assignment : assignments){
			assignmentsObject.put(assignment.get("id").toString(), assignment);
		}
		json_result.put("assignments", assignmentsObject);
		
		return json_result.toString();
	}

}
