import { useEffect, useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState(null);
  const [calendar, setCalendar] = useState(null);
  const [gpt3Response, setGpt3Response] = useState(null);

  useEffect(() => {
    const fetchEmailAndCalendar = async () => {
      try {
        // Fetch new email
        const emailRes = await fetch('/api/mail');
        const emailData = await emailRes.json();
        setEmail(emailData);

        // Fetch next week's calendar
        const calendarRes = await fetch('/api/calendar');
        const calendarData = await calendarRes.json();
        setCalendar(calendarData);

        // Send email body and calendar to GPT-3.5
        const gpt3Res = await fetch('/api/gpt3', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailData, calendar: calendarData }),
        });
        const gpt3Data = await gpt3Res.json();
        setGpt3Response(gpt3Data);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchEmailAndCalendar();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <h2>Email:</h2>
        <pre>{JSON.stringify(email, null, 2)}</pre>
      </div>
      <div>
        <h2>Calendar:</h2>
        <pre>{JSON.stringify(calendar, null, 2)}</pre>
      </div>
      <div>
        <h2>GPT-3 Response:</h2>
        <pre>{JSON.stringify(gpt3Response, null, 2)}</pre>
      </div>
    </div>
  );
}
