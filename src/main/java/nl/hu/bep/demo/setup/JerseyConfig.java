package nl.hu.bep.demo.setup;


import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("api")
public class JerseyConfig extends ResourceConfig {
    public JerseyConfig(){packages("nl.hu.bep.demo.setup.recources.webservices");}

}