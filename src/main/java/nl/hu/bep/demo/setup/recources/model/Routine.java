package nl.hu.bep.demo.setup.recources.model;

import java.util.ArrayList;

public class Routine {

    private String name;
    private ArrayList<Exercise> exercises = new ArrayList<Exercise>();

    public Routine(String name){
        this.name = name;
    }

    public void addExercise(Exercise exercise){
        this.exercises.add(exercise);
    }}
