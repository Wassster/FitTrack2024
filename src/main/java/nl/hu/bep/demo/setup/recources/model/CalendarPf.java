package nl.hu.bep.demo.setup.recources.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CalendarPf {
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

    }


