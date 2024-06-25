package nl.hu.bep.demo.setup.recources.model;



import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;


public class Workouts implements Serializable {

    private LocalDate date = LocalDate.now();
    private Routine routine;

    public Workouts(){

    }

    public Routine getRoutine() {
        return routine;
    }

    public void setRoutine(Routine routine) {
        this.routine = routine;
    }

    public LocalDate getDate() {
        return date;
    }


}
