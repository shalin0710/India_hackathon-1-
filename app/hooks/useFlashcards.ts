import { useState } from 'react';
import { Flashcard } from '@/lib/types';

export const useFlashcards = () => {
  const [notes, setNotes] = useState('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateFlashcards = async () => {
    if (!notes.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      
      const data = await response.json();
      if (response.ok && data.flashcards) {
        setFlashcards(data.flashcards);
        setCurrentCard(0);
        setFlipped(false);
      } else {
        setError(data.error || 'Failed to generate flashcards.');
      }
    } catch (error) {
      console.error('Error generating flashcards:', error);
      setError('An unexpected error occurred.');
    }
    setLoading(false);
  };

  const nextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setFlipped(false);
    }
  };

  const resetFlashcards = () => {
    setFlashcards([]);
    setNotes('');
  }

  return {
    notes,
    setNotes,
    flashcards,
    currentCard,
    flipped,
    setFlipped,
    loading,
    error,
    generateFlashcards,
    nextCard,
    prevCard,
    resetFlashcards,
    progress: ((currentCard + 1) / flashcards.length) * 100
  };
};
