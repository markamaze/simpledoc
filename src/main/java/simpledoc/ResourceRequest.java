package simpledoc;

import simpledoc.utilities.ParseObject;
import java.io.InputStream;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



public class ResourceRequest {

	private String method;
	private List<String> url;
	private Map<String, String> query;
	private Map<String, Object> body_map;



	public ResourceRequest(String method, String url, String query, InputStream body) {
		setMethod(method);
		setURL(url);
		setQuery(query);
		setBody(body);
	}



	@SuppressWarnings("unchecked")
	public List<Object> getBodyElementList(String key) { return (List<Object>) this.body_map.get(key); }
	//if needed, can add a getBodyElementMap() method if the value of a body element is a an object
	private void setBody(InputStream body) {
		if(this.method.equalsIgnoreCase("GET")) this.body_map = null;
		else this.body_map = ParseObject.readJSONMap(body);
	}



	public String method() { return this.method; }
	public String module() { return this.url.get(0); }
	private void setMethod(String method) { this.method = method; }



	public List<String> resource() { return this.url; }
	private void setURL(String url) {
		List<String> temp_url = Arrays.asList(url.split("/"));
		this.url = temp_url.subList(1, temp_url.size());
	}



	public Map<String, String> query() { return this.query; }
	private void setQuery(String query) {
		Map<String, String> temp_query = new HashMap<>();

		if (query == null) this.query = temp_query;
		else {
			Arrays.asList(query.split("?")).forEach( query_item -> {
				String[] split_item = query_item.split("=");
				temp_query.put(split_item[0], split_item[1]);
				});
			this.query = temp_query;
		}
	}
}
