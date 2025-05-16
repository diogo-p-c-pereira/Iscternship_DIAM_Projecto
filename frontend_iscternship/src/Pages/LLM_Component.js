 import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Button } from "reactstrap";

const LLM_Component = ({ cv_path, vaga_info }) => {
    const URL_EXTRACTTEXTPDF = "http://localhost:8000/db_iscternship/extractTextFromPDF/";
    const [cv_text, setPDFText] = useState('')

    useEffect(() => {
        if (!cv_path) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(URL_EXTRACTTEXTPDF + cv_path );
                setPDFText(response.data);
            } catch (error) {
                setPDFText("Erro")
            }
        };
        fetchData();
    }, [cv_path]);

  const [response, setResponse] = useState('');
  const [sent, setSent] = useState('');
  let prompt = "Dá me em portugues de portugal neste formato: 'pontuacao;opiniao' , " +
      "uma avaliação de 0 a 10 de o candidato ser aceite numa vaga de estágios com uma opinião resumida com as seguintes informações: cv_candidato:"
    + cv_text.text + " informação em json da vaga: " + vaga_info

  const sendMessage = async () => {
      try {
          setSent(true)
          const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
          const apiKey = process.env.REACT_APP_LLM_API_KEY;

          const headers = {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'http://localhost:3000',
              'X-Title': 'DIAM Api'
          };

          const requestBody = {
              model: 'nousresearch/deephermes-3-mistral-24b-preview:free', // choosen model
              messages: [{ role: 'user', content: prompt }]
          };

          const { data } = await axios.post(apiUrl, requestBody, { headers });
          setResponse(data.choices[0].message.content);

      } catch (error) {
          console.error('Error sending message:', error.response?.data || error.message);
      }
  };

  return (
      <div>
          {cv_path}
          <br/>
          {cv_text.text}
          <br/>
          {vaga_info}
          <div>
              <Button color="info" onClick={sendMessage}>Avaliar</Button>
          </div>
          {sent?
          <div>
              {response ? <p>{response}</p>: <p>A aguardar resposta do LLM...</p>}
          </div>:null}
      </div>
  );
};

export default LLM_Component;