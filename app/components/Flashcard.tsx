'use client'

import { useFlashcards } from '@/hooks/useFlashcards';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Progress } from '@/components/ui/Progress';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';

export function FlashcardComponent() {
  const {
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
    progress
  } = useFlashcards();

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/10 border-0 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
          <RefreshCw className="w-6 h-6" />
          Flashcard Maker
        </CardTitle>
      </CardHeader>
      <CardContent>
        {flashcards.length === 0 ? (
          <div className="space-y-4">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your study notes here and I'll create flashcards for you..."
              className="w-full h-40 p-4 rounded-lg border-0 bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/30"
            />
            <Button onClick={generateFlashcards} disabled={loading || !notes.trim()} className="w-full">
              {loading ? 'Generating...' : 'Generate Flashcards'}
            </Button>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
        ) : (
          <div className="space-y-4">
            <div
              className="relative w-full h-64 cursor-pointer group [transform-style:preserve-3d] transition-transform duration-500"
              onClick={() => setFlipped(!flipped)}
              style={{ transform: flipped ? 'rotateY(180deg)' : 'none' }}
            >
              <div className="absolute w-full h-full rounded-xl bg-blue-400/20 flex items-center justify-center p-6 text-center [backface-visibility:hidden]">
                <p className="text-xl text-white font-medium">{flashcards[currentCard]?.front}</p>
              </div>
              <div className="absolute w-full h-full rounded-xl bg-green-400/20 flex items-center justify-center p-6 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <p className="text-lg text-white">{flashcards[currentCard]?.back}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Progress value={progress} />
              <div className="text-sm text-white/80 text-center">
                Card {currentCard + 1} of {flashcards.length}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {flashcards.length > 0 && (
        <CardFooter className="flex justify-between">
          <Button onClick={prevCard} disabled={currentCard === 0} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={resetFlashcards} variant="destructive">
            New Flashcards
          </Button>
          <Button onClick={nextCard} disabled={currentCard === flashcards.length - 1} variant="outline">
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
