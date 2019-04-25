package simpledoc;

import java.io.IOException;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpServer;

public class Simpledoc {

	public static void main(String[] args) {

		ServiceLoader loader = new ServiceLoader();
    Integer port = Integer.parseInt(System.getenv("PORT"));

		try{
		  HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
	    HttpContext context = server.createContext("/");
	    context.setHandler(exchange -> {
	      System.out.println("client request incoming: " + exchange.getRemoteAddress());
	      new ClientThread(exchange, loader).start();
      });
	    server.start();
	    String ipaddress = server.getAddress().toString();
	    System.out.println("Server running at: " + ipaddress);
	  }catch(IOException e) {e.printStackTrace();}
	}
}
