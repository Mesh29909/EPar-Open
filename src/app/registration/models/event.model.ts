/**
 * Event model for event data
 * @summary Class representing an event with its properties
 * @author [Tu nombre y apellido]
 */
export class Event {
  id: number;
  name: string;
  description: string;
  scheduledAt: string;

  constructor(data?: Partial<Event>) {
    this.id = data?.id || 0;
    this.name = data?.name || '';
    this.description = data?.description || '';
    this.scheduledAt = data?.scheduledAt || '';
  }
}
