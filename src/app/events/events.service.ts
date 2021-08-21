import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'

import { Event } from './event.model';

@Injectable({providedIn: 'root'})
export class EventsService {
  private events: Event[] = [];
  private eventsUpdated = new Subject<Event[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getEvents() {
    this.http
    .get<{message: string; events: any }>(
      'http://localhost:3000/api/events'
    )
    .pipe(map((eventData) => {
      return eventData.events.map((event: { name: any; date: any; location: any; weather: any; _id: any; }) => {
        return {
          name: event.name, 
          date: event.date,
          location: event.location,
          weather: event.weather,
          id: event._id
        } //Returning a new object for every event
      });
    }))
    .subscribe(transformedEvents => {
      this.events = transformedEvents;
      this.eventsUpdated.next([...this.events]);
    })
  }

  getEventUpdateListener() {
    return this.eventsUpdated.asObservable();
  }

  getEvent(id: string){
    return this.http.get<{_id: string, name: string, date: string, location: string, weather: string}>("http://localhost:3000/api/events" + id);
  }

  addEvent(name: string, date: string, location: string, weather: string) {
    const event: Event = {
      id: null as any,
      name: name, 
      date: date,
      location: location,
      weather: weather
    };
    this.http.post<{message: string, eventId: string}>('http://localhost:3000/api/events', event)
    .subscribe((responseData) => {
      const id = responseData.eventId;
      event.id = id;
      this.events.push(event);
      this.eventsUpdated.next([...this.events]);
      this.router.navigate(["/"]);
    })
  }

  updateEvent(id: string, name: string, date: string, location: string, weather: string) {
    const event: Event = { 
      id: id, 
      name: name, 
      date: date,
      location: location,
      weather: weather
    };
    this.http.put("http://localhost:3000/api/events/" + id, event)
      .subscribe(response => {
        const updatedEvents = [...this.events];
        const oldEventIndex = updatedEvents.findIndex(p => p.id === event.id);
        updatedEvents[oldEventIndex] = event;
        this.events = updatedEvents;
        this.eventsUpdated.next([...this.events]);
        this.router.navigate(["/"]);
      });
  }

  deleteEvent(eventId: string){
    this.http.delete("http://localhost:3000/api/events/" + eventId)
    .subscribe(() => {
      //Updating events excluding the deleted event
      const updatedEvents = this.events.filter(event => event.id !== eventId)
      this.events = updatedEvents;
      this.eventsUpdated.next([...this.events]);
    })
  }
}