package nl.hu.bep.demo.setup;

import nl.hu.bep.demo.setup.recources.model.Exercise;
import nl.hu.bep.demo.setup.recources.model.FitTrack;
import nl.hu.bep.demo.setup.recources.model.Routine;
import nl.hu.bep.demo.setup.recources.model.User;


import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.util.ArrayList;

@WebListener
public class MyServletContextListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("Initializing application");



        FitTrack fitTrack = DataUtils.getFittrackData();
        if (fitTrack != null) {
            FitTrack.setDeFittrack(fitTrack);
        } else {

            fitTrack = FitTrack.getDeFittrack();
            ArrayList<User> users = fitTrack.getUsers();
            for(User user : users){
                Routine routine = new Routine("push");
                Exercise Exer = new Exercise("Bench","Chest");
                Exercise Exer1 = new Exercise("Shoulder press","Chest");
                Exercise Exer2 = new Exercise("Push up","Chest");
                routine.addExercise(Exer);
                routine.addExercise(Exer1);
                routine.addExercise(Exer2);
                user.addRoutines(routine);

            }
        }


        DataUtils.saveFitTrackData(fitTrack);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("Terminating application");


        FitTrack fitTrack = FitTrack.getDeFittrack();
        DataUtils.saveFitTrackData(fitTrack);
    }
}
