package nl.hu.bep.demo.setup.recources.webservices;



import nl.hu.bep.demo.setup.recources.model.Profile;
import nl.hu.bep.demo.setup.recources.model.User;


import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.logging.Logger;

@Path("Profile")
public class ProfilesResource {


    @POST
    @RolesAllowed("gebruiker")
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

    @PUT
    @Path("edit")
    @RolesAllowed("gebruiker")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editProfile(@Context SecurityContext context, Profile profile){
        User user = (User) context.getUserPrincipal();

        if(user == null){
            return Response.status(Response.Status.UNAUTHORIZED).entity("No user logged in").build();
        }

        user.setProfile(profile);
        return Response.ok("Profiel has been updated").build();
    }

    @GET
    @Path("edit")
    @RolesAllowed("gebruiker")
    @Produces(MediaType.APPLICATION_JSON)
    public Response profile(@Context SecurityContext context){
        User user = (User) context.getUserPrincipal();

        if(user == null){
            return Response.status(Response.Status.UNAUTHORIZED).entity("No user logged in").build();
        }

        Profile profile = user.getProfile();
        return Response.ok(profile).build();
    }


}
