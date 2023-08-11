import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const fetchEmailAndCalendar = async () => {
      // Fetch new email
      const emailRes = await fetch('/api/mail');
      const email = await emailRes.json();

      // Fetch next week's calendar
      const calendarRes = await fetch('/api/calendar');
      const calendar = await calendarRes.json();

      // Send email body and calendar to GPT-3.5
      const gpt3Res = await fetch('/api/gpt3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: "You are an email scheduling assistant",
          emailBody: email.body,
          calendarSummary: calendar.summary,
        }),
      });
      const gpt3Response = await gpt3Res.json();

      // Reply to the email with the GPT-3.5 response
      await fetch('/api/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email.from,
          subject: `Re: ${email.subject}`,
          body: gpt3Response.message,
        }),
      });
    };

    fetchEmailAndCalendar();
  }, []);

  return (
    <div>
      <h1>Welcome to the Email Scheduling Assistant</h1>
      <p>This app is currently processing your requests...</p>
    </div>
  );
}