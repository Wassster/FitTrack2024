package nl.hu.bep.demo.setup.recources.webservices;

import nl.hu.bep.demo.setup.recources.model.User;
import nl.hu.bep.demo.setup.recources.model.Workouts;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.List;

@Path("workout")
public class AddWorkoutResource {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addWorkout(@Context SecurityContext context, Workouts workout) {
        User user = (User) context.getUserPrincipal();

        if (workout == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Workout cannot be null").build();
        }

        user.addWorkouts(workout);
        return Response.ok("Workout has been added").build();
    }

}
