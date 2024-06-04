package nl.hu.bep.demo.setup.recources.model;


import java.io.Serializable;
import java.util.ArrayList;

public class FitTrack implements Serializable {

    private static FitTrack deFittrack = new FitTrack();
    private ArrayList<User> users = new ArrayList<User>();
    private ArrayList<Exercise> exercises = new ArrayList<Exercise>();

    public static FitTrack getDeFittrack() {
        return deFittrack;
    }

    public FitTrack(){

    }

    public static User getUserByName(String user) {
        for(User user1 : getDeFittrack().users){
            if(user.equals(user1.getUsername())){
                return user1;
            }
        }
        return null;
    }

    public static void setDeFittrack(FitTrack fitTrack) {
        deFittrack = fitTrack;
    }

    public ArrayList<User> getUsers() {
        return users;
    }


    public ArrayList<Exercise> getExercises() {
        return exercises;
    }

    public void addUser(User user) {
        this.users.add(user);
    }
    public void addExercises(Exercise exercise){
        this.exercises.add(exercise);
    }

}
