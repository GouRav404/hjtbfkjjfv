import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method should be POST' });
  } else {
    try {
      const { body } = req;
      const url = 'https://api.openai.com/v1/chat/completions';
      const headers = {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      };

      
       // Modify the payload to include the name
      body.messages.push({ role: 'user', content: 'What is your name?' });
      body.messages.push({ role: 'assistant', content: 'My name is Sriman.' });

      const response = await axios.post(url, body, { headers });

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
}
