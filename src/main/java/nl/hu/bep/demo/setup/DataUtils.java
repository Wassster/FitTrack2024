package nl.hu.bep.demo.setup;



import nl.hu.bep.demo.setup.recources.model.FitTrack;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;

public class DataUtils {
    public static void saveFitTrackData(FitTrack fitTrack){
        try {
            String fittrackSavePath = "fittrack.obj";
            Path path = Path.of(fittrackSavePath);
            OutputStream os = Files.newOutputStream(path);
            ObjectOutputStream oos = new ObjectOutputStream(os);

            oos.writeObject(fitTrack);
            oos.close();
            os.close();


        } catch (IOException e){
            System.out.println(String.format("Exception tijdens het opslaan van de Fittrack data : %s", e.getMessage()));
        }

    }

    public static FitTrack getFittrackData(){
        try {
            String fittrackSavePath = "fittrack.obj";
            Path path = Path.of(fittrackSavePath);

            InputStream is = Files.newInputStream(path);
            ObjectInputStream ois = new ObjectInputStream(is);


            FitTrack fitTrack = (FitTrack) ois.readObject();

            return fitTrack;
        } catch (IOException e){

            for (Object t : e.getStackTrace()){

            }
            System.out.println(String.format("Exception tijdens het openen van de Fittrack data: %s", e.getMessage()));

        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        return null;
    }
}
