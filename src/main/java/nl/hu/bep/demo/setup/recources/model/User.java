package nl.hu.bep.demo.setup.recources.model;

import java.io.Serializable;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Calendar;

public class User implements Principal,  Serializable {

    private String username;
    private String password;
    private String emailAdres;
    private ArrayList<Workouts> workouts = new ArrayList<Workouts>();
    private Profile profile;
    private CalendarPf calendar;
    private String role ;

    public User(){

    }
    public User(String username,String password, String emailAdres){
        this.username = username;
        this.password = password;
        this. emailAdres = emailAdres;
        this.calendar = new CalendarPf();
    }


    public String getUsername() {
        return username;
    }

    public String getEmailAdres() {
        return emailAdres;
    }

    public String getPassword() {
        return password;
    }

    public CalendarPf getCalendar() {
        return calendar;
    }

    public void setCalendar(CalendarPf calendar) {
        this.calendar = calendar;
    }

    public ArrayList<Workouts> getWorkouts() {
        return workouts;
    }

    public Profile getProfile() {
        return profile;
    }
    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public void addWorkouts(Workouts workout) {
        this.workouts.add(workout);
    }

    public String getRole() {
        return role;
    }

    @Override
    public String getName() {
        return null;
    }



}
