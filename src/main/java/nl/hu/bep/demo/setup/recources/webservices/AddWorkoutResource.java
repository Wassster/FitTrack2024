package nl.hu.bep.demo.setup.recources.webservices;

import nl.hu.bep.demo.setup.recources.model.Exercise;
import nl.hu.bep.demo.setup.recources.model.Routine;
import nl.hu.bep.demo.setup.recources.model.User;
import nl.hu.bep.demo.setup.recources.model.Workouts;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRoutines(@Context SecurityContext context) {
        User user = (User) context.getUserPrincipal();
        if (user == null) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        List<Routine> routines = user.getRoutines();
        return Response.ok(routines).build();
    }

    @POST
    @Path("createRoutine")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createRoutine(@Context SecurityContext context, Routine routine) {
        User user = (User) context.getUserPrincipal();

        if(routine == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        user.addRoutines(routine);
        return Response.ok("Workout has been added").build();
    }
}
