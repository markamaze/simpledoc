package simpledoc.services;

import java.sql.SQLData;

public abstract class ModuleObject implements SQLData {
	
	private String object_id;	
	private String object_type;
	
	public ModuleObject(String uuid, String type) {
		this.setId(uuid);
		this.setModuleObjectType(type);
	}
	
	public String getId() { return this.object_id; }
	public void setId(String id_string ) { this.object_id = id_string; }
	public String getModuleObjectType() { return this.object_type; }
	public void setModuleObjectType(String type) { this.object_type = type; } 

}
