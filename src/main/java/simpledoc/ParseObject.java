package simpledoc;


import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import org.json.JSONObject;


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

		return json_obj.toMap();
	}
	
}
