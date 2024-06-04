package nl.hu.bep.demo.setup;

import nl.hu.bep.demo.setup.recources.model.FitTrack;
import nl.hu.bep.demo.setup.recources.model.User;


import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

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
