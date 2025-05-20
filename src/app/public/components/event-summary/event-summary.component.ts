
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { Event } from '../../../registration/models/event.model';
import { EventService } from '../../../registration/services/event.service';
import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {Attendee} from '../../../registration/models/attendee.model';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-event-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    TranslateModule,
    MatButton,
    RouterLink
  ],
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.css']
})
export class EventSummaryComponent implements OnInit {
  @Input() event!: Event;

  attendees: Attendee[] = [];
  attendancePercentage: number = 0;
  isLoading: boolean = true;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    if (this.event) {
      this.loadAttendeeStats();
    }
  }

  loadAttendeeStats(): void {
    this.isLoading = true;
    this.eventService.getEventAttendees(this.event.id).subscribe({
      next: (attendees) => {
        this.attendees = attendees;
        this.attendancePercentage = this.eventService.calculateAttendancePercentage(attendees);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Format percentage for display
   * @param value Percentage value to format
   * @returns Formatted percentage string with 1 decimal point
   */
  formatPercentage(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value / 100);
  }
}
