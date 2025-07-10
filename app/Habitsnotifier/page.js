'use client';

import { useEffect } from "react";

export default function HabitNotifier({ habits }) {
    useEffect(()=>{
        if (typeof window !== "undefined" && Notification?.permission !== "granted") {
    Notification.requestPermission();
}
   const interval =  setInterval(()=>{
        const now = new Date()
        const currentTime =  now.toTimeString().slice(0,5)
        habits.forEach(habit => {
            if(!habit.time){
              return 
            }

            if(habit.time === currentTime){
               new Notification("Habit Reminder", {
            body: `Time to do: ${habit.title}`,
          });
            }
            
        });
    },60000)
      return () => clearInterval(interval);
    }, [habits])

    return null
}
