package nl.hu.bep.demo.setup.recources.model;



import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;


public class Workouts implements Serializable {

    private LocalDate date = LocalDate.now();
    private String name;
    private ArrayList<Exercise> exercises = new ArrayList<Exercise>();


    public Workouts(String name){
        this.name = name;

    }

    public LocalDate getDate() {
        return date;
    }

    public void addExercises(Exercise exercise){this.exercises.add(exercise);}

    public String getName() {
        return name;
    }
}
