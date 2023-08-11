export interface Email {
  from: string;
  to: string;
  subject: string;
  body: string;
}

export interface CalendarEvent {
  start: Date;
  end: Date;
  summary: string;
}

export interface Gpt3Response {
  message: string;
}