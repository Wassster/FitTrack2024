package nl.hu.bep.demo.setup.recources.model;


import java.io.Serializable;

public class Profile implements Serializable {

    private String gender;
    private float height;
    private float weight;
    private String name;


    public Profile(){

    }

    public Profile(String gender, float weight, float height, String name){
        this.gender = gender;
        this.weight = weight;
        this.height = height;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public float getHeight() {
        return height;
    }

    public float getWeight() {
        return weight;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setHeight(float height) {
        this.height = height;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getGender() {
        return gender;
    }
}
