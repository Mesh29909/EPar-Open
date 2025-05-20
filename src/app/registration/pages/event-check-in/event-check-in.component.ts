import { Component } from '@angular/core';
import {TicketValidationComponent} from '../../components/ticket-validation/ticket-validation.component';

@Component({
  selector: 'app-event-check-in',
  imports: [
    TicketValidationComponent
  ],
  templateUrl: './event-check-in.component.html',
  styleUrl: './event-check-in.component.css'
})
export class EventCheckInComponent {

}
