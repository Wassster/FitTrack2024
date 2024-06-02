package nl.hu.bep.demo.setup.recources.webservices;


import nl.hu.bep.demo.setup.recources.model.FitTrack;
import nl.hu.bep.demo.setup.recources.model.User;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("Register")
public class RegisterResource {

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response register(User user){
        FitTrack fitTrack = FitTrack.getDeFittrack();
        fitTrack.addUser(user);
        return Response.ok("registratie gelukt").build();

    }

}
