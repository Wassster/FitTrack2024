package nl.hu.bep.demo.setup.recources.model;



import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;


public class Workouts implements Serializable {

    private String name;
    private LocalDate date = LocalDate.now();
    private ArrayList<Exercise> exercises = new ArrayList<Exercise>();

    public Workouts(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public LocalDate getDate() {
        return date;
    }

    public void addExercise(Exercise exercise){
        this.exercises.add(exercise);
    }
}
