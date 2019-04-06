package simpledoc;

import java.io.IOException;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpServer;

public class Simpledoc {

	public static void main(String[] args) {
		
		//TODO: question -> should service loader be static or instantiated for each request?
		ServiceLoader loader = new ServiceLoader();

		try{
			HttpServer server = HttpServer.create(new InetSocketAddress(3333), 0);
	        HttpContext context = server.createContext("/");
	        context.setHandler(exchange -> {
	        	System.out.println("client request incoming: " + exchange.getRemoteAddress());	        		
	        	new ClientThread(exchange, loader).start();});
	        server.start();
	        String ipaddress = server.getAddress().toString();
	        System.out.println("Server running at: " + ipaddress);
	    }catch(IOException e) {e.printStackTrace();}
	}
}
