/**
 * Event service for fetching and manipulating event data
 * @summary Service to interact with event and attendee data from the API
 * @author [Tu nombre y apellido]
 */
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Event } from '../models/event.model';
import { Attendee } from '../models/attendee.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private apiService: ApiService) {}

  /**
   * Get all events
   */
  getEvents(): Observable<Event[]> {
    return this.apiService.get<Event[]>('events')
      .pipe(map(events => events.map(event => new Event(event))));
  }

  /**
   * Get specific event by id
   */
  getEvent(id: number): Observable<Event> {
    return this.apiService.get<Event>(`events/${id}`)
      .pipe(map(event => new Event(event)));
  }

  /**
   * Get all attendees
   */
  getAttendees(): Observable<Attendee[]> {
    return this.apiService.get<Attendee[]>('attendees')
      .pipe(map(attendees => attendees.map(attendee => new Attendee(attendee))));
  }

  /**
   * Get attendees for a specific event
   */
  getEventAttendees(eventId: number): Observable<Attendee[]> {
    return this.apiService.get<Attendee[]>(`attendees?eventId=${eventId}`)
      .pipe(map(attendees => attendees.map(attendee => new Attendee(attendee))));
  }

  /**
   * Get attendee by ticket identifier
   */
  getAttendeeByTicket(ticketIdentifier: string): Observable<Attendee[]> {
    return this.apiService.get<Attendee[]>(`attendees?ticketIdentifier=${ticketIdentifier}`)
      .pipe(map(attendees => attendees.map(attendee => new Attendee(attendee))));
  }

  /**
   * Check in an attendee
   */
  checkInAttendee(attendeeId: number): Observable<Attendee> {
    const checkedInAt = new Date().toISOString();
    return this.apiService.patch<Attendee>(`attendees/${attendeeId}`, { checkedInAt })
      .pipe(map(attendee => new Attendee(attendee)));
  }

  /**
   * Calculate attendance percentage for an event
   */
  calculateAttendancePercentage(attendees: Attendee[]): number {
    if (!attendees || attendees.length === 0) {
      return 0;
    }

    const checkedInCount = attendees.filter(a => a.checkedInAt !== null).length;
    return (checkedInCount / attendees.length) * 100;
  }
}
