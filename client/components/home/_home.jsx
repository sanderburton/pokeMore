import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { useNavigate } from 'react-router';
import { Navbar } from '../navbar/_navbar';

export const Home = () => {
  const api = useContext(ApiContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);

    const otherRes = await api.get('/types');
    console.log(otherRes)

    const anotherRes = await api.get('/cities');
    console.log(anotherRes)
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app flex column">
      <Navbar user={user} />
      <h1>Which Pokemon trainer are you?</h1>
      <button onClick={() => navigate('/quiz')}>Take the Quiz</button>
    </div>
  );
};
