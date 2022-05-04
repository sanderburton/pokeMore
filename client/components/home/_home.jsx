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
  const [profiles, setProfiles] = useState([]);
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

    // const profileRes = await api.post('/profiles', {
    //   gender: 'male',
    //   personality: 'courageous',
    //   likes: 'jock',
    //   morals: 'righteous',
    //   physical: 'weak',
    // });
    // console.log(profileRes);
    // setTestProfile(profileRes.profile);

    const profilesRes = await api.get('/profiles');
    let filledProfiles = [];
    // console.log(profilesRes);

    profilesRes.profiles.forEach(async (profile) => {
      let filledProfile = await api.get(`/profiles/${profile.id}`);
      filledProfiles.push(filledProfile);
    });
    // console.log(filledProfiles);
    setProfiles(filledProfiles);
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="app flex column">
      <Navbar user={user} />
      <div className="flex row homepage">
        <div className="flex column centered-column">
          <h1 className="big-and-important take-quiz-margin">Which Pokemon trainer are you?</h1>
          <button className="self-center take-quiz-button" onClick={() => navigate('/quiz')}>
            Take the Quiz
          </button>
        </div>

        {profiles.length > 0 && (
          <div className="flex column centered-column">
            {profiles.map((profile, index) => (
              <>
                <h1 className="big-and-important previous-results">Previous Results</h1>
                <Profile key={index} pokemonProfile={profile}></Profile>
              </>
            ))}
          </div>
        )} 
      </div>
    </div>
  );
};
