import { useState, useMemo } from 'react';
import { QuizQuestion } from '@/lib/types';

export const useQuiz = () => {
  const [quizText, setQuizText] = useState('');
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuiz = async () => {
    if (!quizText.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: quizText }),
      });
      
      const data = await response.json();
      if (response.ok && data.quiz) {
        setQuiz(data.quiz);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResults(false);
        setScore(0);
      } else {
        setError(data.error || 'Failed to generate quiz.');
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      setError('An unexpected error occurred.');
    }
    setLoading(false);
  };

  const selectAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    
    if (answerIndex === quiz[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < quiz.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setQuiz([]);
    setQuizText('');
    setShowResults(false);
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
  }

  const progress = useMemo(() => ((currentQuestion + 1) / quiz.length) * 100, [currentQuestion, quiz.length]);

  return {
    quizText,
    setQuizText,
    quiz,
    currentQuestion,
    selectedAnswer,
    showResults,
    score,
    loading,
    error,
    generateQuiz,
    selectAnswer,
    resetQuiz,
    progress
  };
};
