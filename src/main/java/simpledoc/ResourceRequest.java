package simpledoc;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONStringer;


//TODO: may need to keep modifying this class as I move forward,
//		this should break body down into: data
//			this should break the data elements down into: id, type, attributes, relationships
//
//		can use external packages for processing json into this structure, 
//		but keep all in/out parameters as Strings or Collections of Strings

public class ResourceRequest {
	private String method;
	private List<String> url;
	private List<String> query;
	private List<Map<String, Object>> body_data;

	public ResourceRequest(String requestMethod, String url, String query, InputStream body) {
		this.method = requestMethod;
		List<String> temp_url = Arrays.asList(url.split("/"));
		this.url = temp_url.subList(1, temp_url.size());
//		this.query = Arrays.asList(query.split("?"));
		this.body_data = this.method.equalsIgnoreCase("GET") ? null : parseBody(body, "data");
	}
	
	//NOTE: this should be able to extract any 1st level property of a request
	// -> so far I only have "data" in 1st level and so that is all this handles.
	//TODO: consider refactor 
	// -> create an HTTPRequestBodyDataObject containing 3 properties (id, type, data)
	private List<Map<String, Object>> parseBody(InputStream body, String body_part) {
		String body_string = "";
		int i;
		try {
			while((i = body.read()) != -1) {
				char c = (char) i;
				body_string += c;
			}		
		} catch(IOException e) { e.printStackTrace(); }
		

		JSONArray data_set = new JSONArray(JSONStringer.valueToString(
								new JSONObject(body_string).get(body_part)));
		
		List<Map<String, Object>> data_item_list = new ArrayList<Map<String, Object>>();
		
		
		//each 'item' in the data_set should be an object with this structure:
		//	{id:string, type:string, object_data:object}
		//convert item to JSONObject
		// then convert to a map -> then to entrySet
		//	then for each entry, 
		data_set.forEach(item -> { 
			JSONObject item_object = new JSONObject(item.toString());
			Map<String, Object> data_item = item_object.toMap();
			data_item_list.add(data_item);
					
		});
		
		return data_item_list;
	}
	
	public String method() { return this.method; }

	public String module() { return this.url.get(0); }
	
	public List<String> resource() { return this.url; }

	public List<String> query() { return this.query; }

	public List<Map<String, Object>> bodyData() { return this.body_data; }
}
