/**
 * Attendee model for attendee data
 * @summary Class representing an attendee with their properties
 * @author [Tu nombre y apellido]
 */
export class Attendee {
  id: number;
  firstName: string;
  lastName: string;
  eventId: number;
  ticketIdentifier: string;
  checkedInAt: string | null;

  constructor(data?: Partial<Attendee>) {
    this.id = data?.id || 0;
    this.firstName = data?.firstName || '';
    this.lastName = data?.lastName || '';
    this.eventId = data?.eventId || 0;
    this.ticketIdentifier = data?.ticketIdentifier || '';
    this.checkedInAt = data?.checkedInAt || null;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
