import { useState } from 'react';
import { ChatMessage } from '@/lib/types';

export const useStudyBuddy = () => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askStudyBuddy = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/study-buddy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      
      const data = await response.json();
      if (response.ok && data.answer) {
        const newChat: ChatMessage = { question, answer: data.answer };
        setChatHistory(prev => [...prev, newChat]);
        setQuestion('');
      } else {
        setError(data.error || 'Failed to get an answer.');
      }
    } catch (error) {
      console.error('Error asking study buddy:', error);
      setError('An unexpected error occurred.');
    }
    setLoading(false);
  };

  return {
    question,
    setQuestion,
    chatHistory,
    loading,
    error,
    askStudyBuddy,
  };
};
