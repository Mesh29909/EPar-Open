/**
 * Ticket Validation component
 * @summary Component for validating and checking in attendees with ticket identifiers
 * @author [Tu nombre y apellido]
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { EventService } from '../../services/event.service';
import { Attendee } from '../../models/attendee.model';
import { Event } from '../../models/event.model';


@Component({
  selector: 'app-ticket-validation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    TranslateModule
  ],
  templateUrl: './ticket-validation.component.html',
  styleUrl: './ticket-validation.component.css'
})
export class TicketValidationComponent implements OnInit {
  ticketIdentifier: string = '';
  validationMessage: 'success' | 'invalid' | 'already-checked-in' | null = null;
  isLoading: boolean = false;
  attendee: Attendee | null = null;
  event: Event | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {}

  validateTicket(): void {
    if (!this.ticketIdentifier.trim()) {
      return;
    }

    this.isLoading = true;
    this.validationMessage = null;
    this.attendee = null;
    this.event = null;

    this.eventService.getAttendeeByTicket(this.ticketIdentifier).subscribe({
      next: (attendees) => {
        if (attendees.length === 0) {
          this.validationMessage = 'invalid';
          this.isLoading = false;
          return;
        }

        const attendee = attendees[0];

        if (attendee.checkedInAt !== null) {
          this.validationMessage = 'already-checked-in';
          this.isLoading = false;
          return;
        }

        this.processCheckIn(attendee);
      },
      error: () => {
        this.validationMessage = 'invalid';
        this.isLoading = false;
      }
    });
  }

  private processCheckIn(attendee: Attendee): void {
    this.eventService.checkInAttendee(attendee.id).subscribe({
      next: (updatedAttendee) => {
        this.attendee = updatedAttendee;
        this.loadEventDetails(updatedAttendee.eventId);
      },
      error: () => {
        this.validationMessage = 'invalid';
        this.isLoading = false;
      }
    });
  }

  private loadEventDetails(eventId: number): void {
    this.eventService.getEvent(eventId).subscribe({
      next: (event) => {
        this.event = event;
        this.validationMessage = 'success';
        this.isLoading = false;
      },
      error: () => {
        this.validationMessage = 'invalid';
        this.isLoading = false;
      }
    });
  }
}
