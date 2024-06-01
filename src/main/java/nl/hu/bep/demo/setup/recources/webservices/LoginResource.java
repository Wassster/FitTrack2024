package nl.hu.bep.demo.setup.recources.webservices;


import nl.hu.bep.demo.setup.recources.model.FitTrack;
import nl.hu.bep.demo.setup.recources.model.User;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("login")
public class LoginResource {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(User user){

        FitTrack fitTrack = FitTrack.getDeFittrack();
        List<User> users =fitTrack.getUsers();
        for(User user1 : users){
            if(user1.getUsername().equals(user.getUsername())&&user1.getPassword().equals(user.getPassword())){
                return Response.ok("login succesvol").build();
            }else{
                return Response.status(Response.Status.UNAUTHORIZED).entity("ongeldige gegevens").build();
            }
        }
        return null;
    }
}
