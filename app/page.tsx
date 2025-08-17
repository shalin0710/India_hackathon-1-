'use client'

import { useState } from 'react';
import { FlashcardComponent } from '@/components/Flashcard';
import { QuizComponent } from '@/components/Quiz';
import { StudyBuddyComponent } from '@/components/StudyBuddy';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { BookOpen, Bot, HelpCircle } from 'lucide-react';

const tabs = [
  { id: 'flashcards', label: 'Flashcards', icon: BookOpen },
  { id: 'quiz', label: 'Quiz', icon: HelpCircle },
  { id: 'study-buddy', label: 'Study Buddy', icon: Bot },
];

export default function LearnAI() {
  const [activeTab, setActiveTab] = useState('flashcards');

  const renderContent = () => {
    switch (activeTab) {
      case 'flashcards':
        return <FlashcardComponent />;
      case 'quiz':
        return <QuizComponent />;
      case 'study-buddy':
        return <StudyBuddyComponent />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white mb-2 tracking-tight">
            LearnAI
          </h1>
          <p className="text-lg text-gray-400">Your AI-Powered Learning Companion</p>
        </header>

        <div className="flex justify-center mb-8">
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-2 flex space-x-2 border border-gray-700">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg transition-all flex items-center gap-2",
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </Button>
              )
            })}
          </div>
        </div>

        <main className="max-w-4xl mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}