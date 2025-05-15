 import React, { useState } from 'react';
import axios from 'axios';

const Gpt = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');


const sendMessage = async () => {
    try {
      const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
      const apiKey = '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'; 


const headers = {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'DIAM Api'
        };



        const requestBody = {
            model: 'nousresearch/deephermes-3-mistral-24b-preview:free', // choosen model
            messages: [{ role: 'user', content: input }]
        };


      const { data } = await axios.post(apiUrl, requestBody, { headers });

      setResponse(data.choices[0].message.content);
   } catch (error) {
         console.error('Error sending message:', error.response?.data || error.message);
   }
};


  return (
    <div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Gpt;