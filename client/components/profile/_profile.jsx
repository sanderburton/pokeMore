import { useContext, useState, useEffect } from 'react';
import { ApiContext } from '../../utils/api_context';
import { trainerImages } from './trainerImages';

export const Profile = ({ pokemonProfile }) => {
  const api = useContext(ApiContext);
  const [user, setUser] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    console.log(pokemonProfile);
    const pokeRes = await api.get(pokemonProfile.pokemon);
    setPokemon(pokeRes);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading Profile...</div>;
  }

  return (
    <div className="flex column">
      <div className="flex column">
        <img className="pokemon-sprite" src={pokemon.sprites.front_default}></img>
        <img className="trainer-sprite" src={trainerImages[pokemonProfile.trainer.slug.replaceAll('-', '_')]}></img>
      </div>
    </div>
  );
};
