package nl.hu.bep.demo.setup.recources.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Workouts implements Serializable {

    private LocalDate date;
    private String workoutName;
    private List<Exercise> exercises;
    
    public Workouts() {
        this.date = LocalDate.now();
        this.exercises = new ArrayList<>();
    }

    @JsonCreator
    public Workouts(
            @JsonProperty("workoutName") String workoutName,
            @JsonProperty("date") LocalDate date,
            @JsonProperty("exercises") List<Exercise> exercises) {
        this.workoutName = workoutName;
        this.date = (date != null) ? date : LocalDate.now();
        this.exercises = (exercises != null) ? exercises : new ArrayList<>();
    }

    @JsonProperty("date")
    public LocalDate getDate() {
        return date;
    }

    @JsonProperty("workoutName")
    public String getWorkoutName() {
        return workoutName;
    }

    @JsonProperty("exercises")
    public List<Exercise> getExercises() {
        return exercises;
    }

    public void addExercise(Exercise exercise) {
        this.exercises.add(exercise);
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setWorkoutName(String workoutName) {
        this.workoutName = workoutName;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }
}
