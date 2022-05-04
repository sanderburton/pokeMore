import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { useNavigate } from 'react-router';
import { Navbar } from '../navbar/_navbar';
import { Profile } from '../profile/_profile';

export const Home = () => {
  const api = useContext(ApiContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [testProfile, setTestProfile] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);

    const typesRes = await api.get('/types');
    console.log(typesRes);

    const citiesRes = await api.get('/cities');
    console.log(citiesRes);

    const trainersRes = await api.get('/trainers');
    console.log(trainersRes);

    const profileRes = await api.post('/profiles', {
      gender: 'male',
      personality: 'smart',
      likes: 'gamer',
      morals: 'righteous',
      physical: 'weak',
    });
    console.log(profileRes);
    setTestProfile(profileRes.profile);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app flex column">
      <Navbar user={user} />
      {testProfile && (
        <>
          <h1>Previous Results</h1>
          <Profile pokemonProfile={testProfile}></Profile>
        </>
      )}
      <h1>Which Pokemon trainer are you?</h1>
      <button onClick={() => navigate('/quiz')}>Take the Quiz</button>
    </div>
  );
};
