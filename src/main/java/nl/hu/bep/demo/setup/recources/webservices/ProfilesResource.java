package nl.hu.bep.demo.setup.recources.webservices;


import nl.hu.bep.demo.setup.recources.model.FitTrack;
import nl.hu.bep.demo.setup.recources.model.Profile;
import nl.hu.bep.demo.setup.recources.model.User;

import javax.net.ssl.HandshakeCompletedEvent;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("createProfile")
public class ProfilesResource {

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createProfile(@Context HttpServletRequest request, Profile profile){
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("No user logged in").build();
        }

        User user = (User) session.getAttribute("user");
        user.setProfile(profile);

        return Response.ok("Profile created successfully").build();
    }
}
