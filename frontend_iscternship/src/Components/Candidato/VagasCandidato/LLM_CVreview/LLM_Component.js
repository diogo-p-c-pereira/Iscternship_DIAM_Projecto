import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "reactstrap";
import ProgressBar from './ProgressBar';
import { GoogleGenerativeAI } from '@google/generative-ai';

const LLM_Component = ({ cv_path, vaga_info }) => {
    const URL_EXTRACTTEXTPDF = "http://localhost:8000/db_iscternship/extractTextFromPDF";
    const [cv_text, setPDFText] = useState('');
    const [points, setPoints] = useState('');
    const [response, setResponse] = useState('');
    const [sent, setSent] = useState(false);

    useEffect(() => {
        if (!cv_path) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(URL_EXTRACTTEXTPDF + cv_path);
                setPDFText(response.data);
            } catch (error) {
                setPDFText("Erro");
            }
        };
        fetchData();
    }, [cv_path]);

    const sendMessage = async () => {
        setSent(true);

        const prompt = "Dá me em portugues de portugal neste formato: 'pontuacao;opiniao' , " +
            "uma avaliação de 0 a 10 de o candidato ser aceite numa vaga de estágios com uma opinião resumida com as seguintes informações: cv_candidato: "
            + cv_text.text + " informação em json da vaga: " + vaga_info;

        try {
            const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await model.generateContent(prompt);
            const content = result.response.text();

            const parts = content.split(";");
            setPoints(Number(parts[0]));
            setResponse(parts[1]);
        } catch (error) {
            console.error("Gemini API error:", error);
        }
    };

    return (
        <div>
            {sent ? (
                <div>
                    {points ? (
                        <div>
                            <ProgressBar value={points}/>
                            <p>{response}</p>
                        </div>
                    ) : (
                        <p>A aguardar resposta do LLM...</p>
                    )}
                </div>
            ) : <button
                type="button"
                className="register-button vagas-modal-fechar"
                onClick={() => sendMessage()}
            >Avaliar Candidatura c/AI
            </button>}
        </div>
    );
};

export default LLM_Component;
