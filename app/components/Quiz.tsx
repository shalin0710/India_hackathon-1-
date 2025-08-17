'use client'

import { useQuiz } from '@/hooks/useQuiz';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Progress } from '@/components/ui/Progress';
import { Check, HelpCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function QuizComponent() {
  const {
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
  } = useQuiz();

  const currentQ = quiz[currentQuestion];

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/10 border-0 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-6 h-6" />
          Quiz Maker
        </CardTitle>
      </CardHeader>
      <CardContent>
        {quiz.length === 0 && !showResults ? (
          <div className="space-y-4">
            <Textarea
              value={quizText}
              onChange={(e) => setQuizText(e.target.value)}
              placeholder="Paste text here and I'll create a quiz for you..."
              className="w-full h-40 p-4 rounded-lg border-0 bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/30"
            />
            <Button onClick={generateQuiz} disabled={loading || !quizText.trim()} className="w-full">
              {loading ? 'Creating Quiz...' : 'Create Quiz'}
            </Button>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
        ) : showResults ? (
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-white">Quiz Complete!</h3>
            <p className="text-xl text-white">
              You scored {score} out of {quiz.length} ({Math.round((score / quiz.length) * 100)}%)
            </p>
            <Button onClick={resetQuiz} className="w-full sm:w-auto">
              Take Another Quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <Progress value={progress} />
              <div className="text-sm text-white/80">
                Question {currentQuestion + 1} of {quiz.length}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">
                {currentQ?.question}
              </h3>
              <div className="space-y-3">
                {currentQ?.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = currentQ.correct === index;
                  return (
                    <Button
                      key={index}
                      onClick={() => selectAnswer(index)}
                      disabled={selectedAnswer !== null}
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left h-auto py-3 px-4 whitespace-normal",
                        "bg-white/20 text-white hover:bg-white/30",
                        selectedAnswer !== null && isCorrect && "bg-green-500/50 border-green-400 text-white",
                        isSelected && !isCorrect && "bg-red-500/50 border-red-400 text-white"
                      )}
                    >
                      {option}
                    </Button>
                  )
                })}
              </div>
            </div>
            {selectedAnswer !== null && (
              <div className="p-4 bg-white/20 rounded-lg space-y-2 border border-white/30">
                <h4 className="font-bold text-white flex items-center gap-2">
                  {selectedAnswer === currentQ.correct ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <X className="w-5 h-5 text-red-400" />
                  )}
                  Explanation
                </h4>
                <p className="text-white/90">{currentQ?.explanation}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
