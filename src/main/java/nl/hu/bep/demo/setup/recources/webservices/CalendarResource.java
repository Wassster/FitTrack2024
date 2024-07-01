package nl.hu.bep.demo.setup.recources.webservices;


import nl.hu.bep.demo.setup.recources.model.CalendarPf;
import nl.hu.bep.demo.setup.recources.model.User;
import nl.hu.bep.demo.setup.recources.model.Workouts;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("calendar")
public class CalendarResource {

    @GET
    @RolesAllowed("gebruiker")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPastWorkouts(@Context SecurityContext context) {

        User user = (User) context.getUserPrincipal();

        ArrayList<Workouts> workouts = user.getWorkouts();
        CalendarPf calendarPf = new CalendarPf();

        for (Workouts workout : workouts) {
            calendarPf.addWorkout(workout);
        }

        return Response.ok(calendarPf.getCalendar()).build();
    }
}


