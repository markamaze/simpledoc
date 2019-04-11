package simpledoc;

import java.io.FileInputStream;
import java.net.InetSocketAddress;
import java.security.KeyStore;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLEngine;
import javax.net.ssl.SSLParameters;

import com.sun.net.httpserver.HttpsConfigurator;
import com.sun.net.httpserver.HttpsExchange;
import com.sun.net.httpserver.HttpsParameters;
import com.sun.net.httpserver.HttpsServer;

public class Simpledoc {


    public static void main(String[] args) throws Exception {

        try {
            // initialize the HTTPS server
        	InetSocketAddress address = new InetSocketAddress("127.0.0.1", 3333);
            HttpsServer httpsServer = HttpsServer.create(address, 0);

            // initialize the key store
            char[] password = "password".toCharArray();
            KeyStore key_store = KeyStore.getInstance("JKS");
            FileInputStream file_input = new FileInputStream("src/main/java/simpledoc/testkey.jks");
            key_store.load(file_input, password);

            // setup the key manager factory
            KeyManagerFactory key_manager_factory = KeyManagerFactory.getInstance("SunX509");
            key_manager_factory.init(key_store, password);

            // setup the trust manager factory
            TrustManagerFactory trust_manager_factory = TrustManagerFactory.getInstance("SunX509");
            trust_manager_factory.init(key_store);

            // setup the HTTPS context and parameters
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(key_manager_factory.getKeyManagers(), trust_manager_factory.getTrustManagers(), null);


            //TODO: consider refacoring
            // I may want to create a context for each of the main module types
            // and load the service and resource request object directly?
            // then the server response could be send from the server directly
            httpsServer.createContext("/", exchange -> {
              System.out.println(exchange.getRequestMethod());
              System.out.println(exchange.getRequestURI().getPath());
            	new ClientThread((HttpsExchange)exchange, new ServiceLoader()).run(); });


            httpsServer.setHttpsConfigurator(new HttpsConfigurator(sslContext) {
                public void configure(HttpsParameters params) {
                    try {
                        // initialize the SSL context
                        SSLContext context = getSSLContext();
                        SSLEngine engine = context.createSSLEngine();
                        params.setNeedClientAuth(false);
                        params.setCipherSuites(engine.getEnabledCipherSuites());
                        params.setProtocols(engine.getEnabledProtocols());

                        // Set the SSL parameters
                        SSLParameters sslParameters = context.getSupportedSSLParameters();
                        params.setSSLParameters(sslParameters);

                    } catch (Exception e) {e.printStackTrace();}
                }
            });
            httpsServer.setExecutor(null);
            httpsServer.start();

            System.out.println("server started on port " + httpsServer.getAddress().getPort());

        } catch (Exception e) {e.printStackTrace();}
    }

}
