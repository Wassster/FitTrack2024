package nl.hu.bep.demo.setup.recources.model;

import java.io.Serializable;

public class Exercise implements Serializable {

    private String name;
    private String targetedMuscle;
    private int sets;
    private int reps;
    private float weight;

    public Exercise(String name,String targetedMuscle){
        this.name= name;
        this.targetedMuscle = targetedMuscle;
    }

    public String getName() {
        return name;
    }

    public String getTargetedMuscle() {
        return targetedMuscle;
    }

    public void setReps(int reps) {
        this.reps = reps;
    }

    public void setSets(int sets) {
        this.sets = sets;
    }

    public int getReps() {
        return reps;
    }

    public int getSets() {
        return sets;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public float getWeight() {
        return weight;
    }
}
