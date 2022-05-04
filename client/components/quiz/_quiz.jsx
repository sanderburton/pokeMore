import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { Navbar } from '../navbar/_navbar';
import { Question } from './_question';
import { questions } from '../../utils/quiz_data';

export const Quiz = () => {
  const api = useContext(ApiContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);

  const readQuizIntoDto = (event) => {
    setError(null);
    let createProfileDto = {
      gender: '',
      personality: '',
      likes: '',
      morals: '',
      physical: '',
    };

    event.preventDefault();
    questions.forEach((question, index) => {
      if (!question.category) return;
      const checkedButton = document.querySelector(`input[name="Q${index}"]:checked`);
      if (!checkedButton) {
        setError('Please answer every question');
        console.log('Error, not all questions are answered');
        return;
      }
      const selectedAnswer = document.querySelector(`label[for="${checkedButton.id}"]`).textContent;
      question.options.forEach((option) => {
        if (option.text === selectedAnswer) {
          if (createProfileDto[question.category] && createProfileDto[question.category] !== option.result) {
            // the two answers are different categories, pick a random number either 0 or 1;
            const randomInt = Math.floor(Math.random() * 2);
            if (randomInt === 0) {
              createProfileDto[question.category] = option.result;
            } // if the number is one, then leave the current result in the dto, i.e. do nothing
          } else {
            createProfileDto[question.category] = option.result;
          }
        }
      });
    });

    return createProfileDto;
  };

  const handleSubmit = async (event) => {
    const createProfileDto = readQuizIntoDto(event);
    const newProfile = await api.post('/profiles', createProfileDto);
    console.log(newProfile);
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex column">
      <Navbar user={user} />
      <div className="flex column">
        <form className="flex column">
          {questions.map((q, index) => (
            <Question key={index} questionId={'Q' + index} question={q} />
          ))}
          {error && <div className="error">Error: {error}</div>}
          <button type="button" className="submit-quiz-button" onClick={handleSubmit}>
            Submit Quiz
          </button>
          <div></div>
        </form>
      </div>
    </div>
  );
};
