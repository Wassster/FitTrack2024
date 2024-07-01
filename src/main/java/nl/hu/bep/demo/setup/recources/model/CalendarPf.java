package nl.hu.bep.demo.setup.recources.model;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.KeyDeserializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CalendarPf implements Serializable {

    @JsonSerialize(keyUsing = LocalDateKeySerializer.class)
    @JsonDeserialize(keyUsing = LocalDateKeyDeserializer.class)
    private Map<LocalDate, List<Workouts>> calendar;

    public CalendarPf() {
        calendar = new HashMap<>();
    }

    public void addWorkout(Workouts workout) {
        LocalDate date = workout.getDate();
        calendar.putIfAbsent(date, new ArrayList<>());
        calendar.get(date).add(workout);
    }

    public List<Workouts> getWorkouts(LocalDate date) {
        return calendar.getOrDefault(date, new ArrayList<>());
    }

    public Map<LocalDate, List<Workouts>> getCalendar() {
        return calendar;
    }

    public static class LocalDateKeySerializer extends StdSerializer<LocalDate> {   //https://stackoverflow.com/questions/28802544/java-8-localdate-jackson-format

        public LocalDateKeySerializer() {
            super(LocalDate.class);
        }

        @Override
        public void serialize(LocalDate value, JsonGenerator gen, SerializerProvider provider) throws IOException {
            gen.writeFieldName(value.toString());
        }
    }

    public static class LocalDateKeyDeserializer extends KeyDeserializer {

        @Override
        public LocalDate deserializeKey(String key, DeserializationContext ctxt) throws IOException {
            return LocalDate.parse(key);
        }
    }
}
