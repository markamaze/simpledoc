package simpledoc.services;

import java.util.UUID;

public abstract class ModuleObject {

	private UUID object_id;
	private String object_type;

	public ModuleObject(UUID uuid, String type) {
		this.setId(uuid);
		this.setModuleObjectType(type);
	}

	public UUID getId() { return this.object_id; }
	private void setId(UUID id_string ) { this.object_id = id_string; }

	public String getModuleObjectType() { return this.object_type; }
	private void setModuleObjectType(String type) { this.object_type = type; }

}
