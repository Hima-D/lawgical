// pages/api/schedule.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullName, email, selectedDate, selectedTime, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !selectedDate || !selectedTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Simulate saving data (you could replace this with actual database logic)
    // This is where you would interact with a database or send an email, etc.
    try {
      // Simulating a delay like saving data to a database or sending an email
      setTimeout(() => {
        return res.status(200).json({
          message: 'Your consultation has been scheduled successfully!',
        });
      }, 1000);
    } catch (error) {
      // If an error occurs while handling the data
      return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
  } else {
    // If the request is not a POST, respond with a 405 Method Not Allowed
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
