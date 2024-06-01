package nl.hu.bep.demo.setup.recources.model;


public class Profile {

    private int age;
    private float height;
    private float weight;
    private String name;

    public Profile(int age, float weight, float height, String name){
        this.age = age;
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
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
}
