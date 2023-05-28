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

      const payload = {
        messages: [
          { role: 'system', content: 'You are a user' },
          { role: 'user', content: 'What is your name?' },
          { role: 'assistant', content: 'My name is Sriman.' }
        ]
      };

      const response = await axios.post(url, payload, { headers });

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
}
