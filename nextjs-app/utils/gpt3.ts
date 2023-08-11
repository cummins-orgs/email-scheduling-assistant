import { OpenAI } from 'openai';
import { Email, CalendarEvent } from '../types/index.d.ts';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function sendToGpt3(email: Email, events: CalendarEvent[]) {
  const prompt = `You are an email scheduling assistant. Here is the summary of the next week's calendar: ${events.map(event => `${event.start} - ${event.end}: ${event.summary}`).join('\n')}. Write a short email. In it, you suggest some times between 11am and 6pm on weekdays that could work given this calendar information, i.e. times that are not already booked.`;

  const gptResponse = await openai.complete({
    engine: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 150,
  });

  return gptResponse.data.choices[0].text.trim();
}