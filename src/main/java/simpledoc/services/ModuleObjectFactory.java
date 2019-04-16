package simpledoc.services;

import java.util.Map;

public interface ModuleObjectFactory {
	public ModuleObject build(Map<String, Object> data_item);
}
