package nl.hu.bep.demo.setup.recources.webservices;

import nl.hu.bep.demo.setup.recources.model.CalendarPf;
import nl.hu.bep.demo.setup.recources.model.User;
import nl.hu.bep.demo.setup.recources.model.Workouts;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.Calendar;
import java.util.List;

@Path("workout")
public class AddWorkoutResource {

    @POST
    @RolesAllowed("gebruiker")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addWorkout(@Context SecurityContext context, Workouts workout) {
        System.out.println("komt hier aan");
        User user = (User) context.getUserPrincipal();

        if (workout == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Workout cannot be null").build();
        }
        System.out.println("komt zelfs hier");

        user.addWorkouts(workout);
        CalendarPf calendar = user.getCalendar();
        if(calendar == null){
            CalendarPf calendarpf = new CalendarPf();
            calendarpf.addWorkout(workout);
            user.setCalendar(calendarpf);
            return Response.ok("Workout has been added/calendar").build();
        }

        calendar.addWorkout(workout);
        System.out.println(workout);
        return Response.ok("Workout has been added").build();
    }

}
