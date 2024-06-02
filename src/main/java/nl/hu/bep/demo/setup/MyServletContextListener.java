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
        System.out.println("initializing application");
        User user = new User("Wassster","1234","wassimzenasni@gmail.com");
        FitTrack.getDeFittrack().addUser(user);

    }
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("terminating application");
    }
}
