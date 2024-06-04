package nl.hu.bep.demo.setup.recources.webservices;



import nl.hu.bep.demo.setup.recources.model.Profile;
import nl.hu.bep.demo.setup.recources.model.User;


import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

@Path("Profile")
public class ProfilesResource {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createProfile(@Context SecurityContext context, Profile profile){
        User user = (User) context.getUserPrincipal();

        if(user == null){
            return Response.status(Response.Status.UNAUTHORIZED).entity("No user logged in").build();
        }

        user.setProfile(profile);
        return Response.ok("Profiel created").build();
    }


}
