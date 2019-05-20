package simpledoc.utilities;


import java.util.HashMap;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Map.Entry;

import org.json.JSONObject;
import org.json.JSONStringer;

public class ParseObject {


	public static Map<String, Object> readJSONMap(InputStream json_stream) {
		String json_string = "";
		try {
			int i;
			while((i = json_stream.read()) != -1) {
				char c = (char) i;
				json_string += c;
			}
		} catch(IOException e) { e.printStackTrace(); }

		JSONObject json_obj = new JSONObject(json_string);

		json_obj.toMap().entrySet().stream().map( item -> {
			Map<String, Entry<Class<?>, ?>> obj = new HashMap<>();
			String key = item.getKey();
			Object value = item.getValue();

			switch(key){
				case "id":
					break;
				case "type":

					break;
				case "object_data":

					break;
				default:

			}
			return obj;
		});

		return json_obj.toMap();
	}

	public static String writeJSONString(Object parse_object) {
		return JSONStringer.valueToString(parse_object);
	}
}
