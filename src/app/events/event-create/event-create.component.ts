import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { EventsService } from "../events.service";
import { Event } from "../event.model";

@Component({
  selector: "app-event-create",
  templateUrl: "./event-create.component.html",
  styleUrls: ["./event-create.component.css"]
})
export class EventCreateComponent implements OnInit {
  enteredName = "";
  enteredDate = "";
  enteredLocation = "";
  enteredWeather = "";
  event: Event;
  isLoading = false;
  private mode = 'create';
  private eventId: string;

  constructor(
    public eventsService: EventsService, 
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('eventId')){
        this.mode = 'edit';
        this.eventId = paramMap.get('eventId');
        this.isLoading = true;
        this.eventsService.getEvent(this.eventId).subscribe(eventData => {
          this.isLoading = false;
          this.event = {
            id: eventData._id,
            name: eventData.name,
            date: eventData.date,
            location: eventData.location,
            weather: eventData.weather,
          }
        });
      } else {
        this.mode = 'create';
        this.eventId = null;
      }
    });
  }

  onSaveEvent(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create'){
      this.eventsService.addEvent(
        form.value.name, 
        form.value.date,
        form.value.location, 
        form.value.weather
      );
    } else {
      this.eventsService.updateEvent(
        this.eventId, 
        form.value.name, 
        form.value.date,
        form.value.location, 
        form.value.weather
      )
    }
    form.resetForm();
  }
}

