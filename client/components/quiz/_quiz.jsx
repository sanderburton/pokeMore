import { useContext, useState, useEffect } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Navbar } from '../navbar/_navbar';
import { Question } from './_question';
import { questions, categories } from '../../utils/quiz_data';

export const Quiz = () => {
  const api = useContext(ApiContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);

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
          <button className="submit-quiz-button">Submit Quiz</button>
          <div></div>
        </form>
      </div>
    </div>
  );
};
