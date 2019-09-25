package simpledoc;

import simpledoc.exceptions.StorageErrorException;
import simpledoc.exceptions.UnsupportedServiceRequest;
import simpledoc.exceptions.ServiceErrorException;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import com.sun.net.httpserver.HttpExchange;

public class ClientThread extends Thread {

	 private HttpExchange exchange;
	 private ServiceLoader services;

	 public ClientThread(HttpExchange exchange, ServiceLoader loader) {
	 	this.exchange = exchange;
	 	this.services = loader;
	 	try { this.join(); }
	 	catch (InterruptedException e) { e.printStackTrace(); }
	 }

	 @Override
	 public void run() {
		 String path = this.exchange.getRequestURI().getPath();
		 String [] path_array = path.split("/");

		 if(path_array.length == 0) loadFile("index.html");
		 else {
			 String last_path_entry = path_array[path_array.length-1];
			 if(last_path_entry.contains(".")) loadFile(path);
			 else handleResourceRequest();

		 }
	 }

	 private void handleResourceRequest() {
		OutputStream out = null;
		ResourceResponse response;
		ResourceRequest request;
		ServiceFunction service;

		try{
		 	request = new ResourceRequest(
	 									this.exchange.getRequestMethod(),
	 									this.exchange.getRequestURI().getPath(),
	 									this.exchange.getRequestURI().getQuery(),
	 									this.exchange.getRequestBody());

			service = this.services.load(request.module(), request.method());

			response = service.run(request);

		} catch (UnsupportedServiceRequest err) {
			response = new ResourceResponse(err.getMessage(), 501);
		} catch (ServiceErrorException err) {
			response = new ResourceResponse(err.getMessage(), 502);
		} catch (StorageErrorException err) {
			response = new ResourceResponse(err.getMessage(), 503);
		}

	 	try {
	 		String body = response.body();
	 		int code = response.responseCode();

	 		this.exchange.sendResponseHeaders(code, body.length());
			out = this.exchange.getResponseBody();
	 		out.write(body.getBytes());
	 		out.flush();
	 		out.close();
	 	} catch (IOException e) { e.printStackTrace(); }

	 }

	 private void loadFile(String directory) {
	 	OutputStream out = null;
	 	FileReader in = null;
	 	String path = "./src/main/webapp/";

	 	try {
	 		exchange.sendResponseHeaders(200, 0);
	 		out = exchange.getResponseBody();

	 		in = new FileReader(path + directory);
	 		int i;
 	 		while((i = in.read()) != -1) {
	 			char character = (char)i;
	 			out.write((byte) character);
	 		}
	 		in.close();
	 		out.flush();
	 		out.close();
	 	} catch (IOException e) { e.printStackTrace(); }
	 }
}
