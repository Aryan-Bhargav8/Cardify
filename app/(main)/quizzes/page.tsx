'use client';
import { useRouter } from 'next/navigation';
import Section from '@/components/Section';
import React, { useState } from 'react';
import Header from '@/components/nav/Header';
import Paragraph from '@/components/Paragraph';
import Footer from '@/components/Footer';
import Title from '@/components/Title';
import ImageWithScrollEffect from '@/components/Image';
import { quizzes } from '@/data/quizzes';
import NavBar from '@/components/nav/nav-bar';

export default function PaymentPage() {
  const [theme, setTheme] = useState('light');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState('quiz'); // 'quiz' or 'review'
  const router = useRouter();

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
    setUserAnswers({});
    setSubmitted(false);
    setViewMode('quiz'); // Reset to quiz mode
  };

  const handleAnswerChange = (questionIndex, option) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: option });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Save the quiz result to local storage (optional)
    const historyEntry = {
      title: selectedQuiz.title,
      score: calculateScore(),
      totalQuestions: selectedQuiz.questions.length,
      date: new Date().toISOString(),
    };

    const storedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    storedHistory.push(historyEntry);
    localStorage.setItem('quizHistory', JSON.stringify(storedHistory));
    setViewMode('review'); // Switch to review mode after submission
  };

  const calculateScore = () => {
    if (!selectedQuiz) return 0;
    return selectedQuiz.questions.reduce((score, question, index) => {
      return score + (userAnswers[index] === question.answer ? 1 : 0);
    }, 0);
  };

  return (
    <div className={`${theme}`}>
      <div className="flex items-center justify-center w-full">
        <NavBar />
      </div>

      <Section theme='dark' setTheme={setTheme}>
        <div className='h-[20vh] '>
          <Header />
        </div>
        <div className="flex-1 flex flex-col justify-center lg:max-w-7xl lg:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 lg:p-4 md:p-20 sm:p-10">
            <ImageWithScrollEffect src={'/assets/undraw_online_test_re_kyfx.svg'} alt={'Engineering Team Illustration'} />
            <div className="flex flex-col gap-8 justify-center sm:text-center">              
              <Title paragraph={'Quizzes page'}/>
              <Paragraph paragraph={""}/>
            </div>
          </div>
        </div>
      </Section>

      <Section theme='dark' setTheme={setTheme}>
        <div className="container mx-auto p-10 border border-neutral-400 rounded text-white ">
          <Title paragraph={'Quizzes'}/>
          {!selectedQuiz ? (
            <div>
              <h2 className="text-2xl mb-4">Select a Quiz:</h2>
              <div className="flex flex-wrap gap-4">
                {quizzes.map((quiz) => (
                  <button
                    key={quiz.id}
                    className={`p-4 rounded border transition duration-200 ${selectedQuiz?.id === quiz.id ? 'bg-purple-500 border-purple-600' : 'bg-gray-600 border-purple-500 hover:bg-purple-400'}`}
                    onClick={() => handleQuizSelect(quiz)}
                  >
                    {quiz.title}
                  </button>
                ))}
              </div>
            </div>
          ) : viewMode === 'quiz' ? (
            <div>
              <h2 className="text-2xl mb-4">{selectedQuiz.title}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {selectedQuiz.questions.map((question, index) => (
                  <div key={index} className="p-6 bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <p className="font-semibold mb-3 text-lg">{question.question}</p>
                    <div className="space-y-3">
                      {question.options.map((option, i) => (
                        <label key={i} className="flex items-center p-2 bg-gray-600 rounded-md hover:bg-gray-500 transition duration-200">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            onChange={() => handleAnswerChange(index, option)}
                            checked={userAnswers[index] === option}
                            className="mr-2 accent-purple-500 cursor-pointer"
                          />
                          <span className="text-gray-300">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200"
                >
                  Submit Answers
                </button>
              </form>

              {submitted && (
                <div className="mt-4">
                  <h3 className="font-bold">Results:</h3>
                  <p>
                    You scored {calculateScore()} out of {selectedQuiz.questions.length}.
                  </p>
                  <button
                    className="mt-4 text-purple-400 hover:text-purple-300 transition duration-200"
                    onClick={() => handleQuizSelect(null)}
                  >
                    Retake Quiz
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl mb-4">Review Results: {selectedQuiz.title}</h2>
              <p>Your score: {calculateScore()} out of {selectedQuiz.questions.length}</p>

              <div className="mt-4">
                <h3 className="font-bold">Your Answers:</h3>
                {selectedQuiz.questions.map((question, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold">{question.question}</p>
                    <p className={`mt-2 ${userAnswers[index] === question.answer ? 'text-green-500' : 'text-red-500'}`}>
                      Your answer: {userAnswers[index] || 'No answer'} 
                      {userAnswers[index] === question.answer ? ' (Correct)' : ' (Incorrect)'}
                    </p>
                    {userAnswers[index] !== question.answer && (
                      <p className="text-gray-400">Correct answer: {question.answer}</p>
                    )}
                  </div>
                ))}
              </div>

              <button
                className="m-6 text-purple-400 hover:text-purple-300 transition duration-200"
                onClick={() => setViewMode('quiz')}
              >
                Retake Quiz
              </button>
              <button
                className="m-6 text-purple-400 hover:text-purple-300 transition duration-200"
                onClick={() => handleQuizSelect(null)}
              >
                Back to Quiz Selection
              </button>
            </div>
          )}

          {/* New Section for Quiz History */}
          <div className="mt-8">
            <h2 className="text-2xl mb-4">History</h2>
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200"
              onClick={() => router.push('/quizzes_history')}
            >
              View Quiz History
            </button>
          </div>
        </div>
      </Section>

      <Section theme='dark' setTheme={setTheme}>
        <Footer />
      </Section>
    </div>
  );
}