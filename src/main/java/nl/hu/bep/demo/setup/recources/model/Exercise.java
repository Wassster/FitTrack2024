package nl.hu.bep.demo.setup.recources.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class Exercise implements Serializable {

    private String name;
    private String weight;
    private String reps;
    private String sets;


    public Exercise() {
    }


    @JsonCreator
    public Exercise(
            @JsonProperty("name") String name,
            @JsonProperty("weight") String weight,
            @JsonProperty("reps") String reps,
            @JsonProperty("sets") String sets) {
        this.name = name;
        this.weight = weight;
        this.reps = reps;
        this.sets = sets;
    }

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("weight")
    public String getWeight() {
        return weight;
    }

    @JsonProperty("reps")
    public String getReps() {
        return reps;
    }

    @JsonProperty("sets")
    public String getSets() {
        return sets;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public void setReps(String reps) {
        this.reps = reps;
    }

    public void setSets(String sets) {
        this.sets = sets;
    }
}
