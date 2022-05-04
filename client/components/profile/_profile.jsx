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
    const pokeRes = await api.get(pokemonProfile.pokemon);
    setPokemon(pokeRes);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading Profile...</div>;
  }

  return (
    <div className="flex column centered-column">
      <h1 className="results-label">{`${pokemonProfile.trainer.name} ${user.firstName}`}</h1>
      <h1 className="results-label">{`From ${pokemonProfile.city.name}`}</h1>
      <h1 className="results-label">{`Trains ${pokemonProfile.type.name} type pokemon`}</h1>
      <h1 className="results-label">{`Gym Badges: ${pokemonProfile.badges}`}</h1>
      <h1 className="results-label">{`Starter Pokemon: ${pokemon.species.name}`}</h1>
      <div className="flex row sprites-container">
        <img className="trainer-sprite" src={trainerImages[pokemonProfile.trainer.slug.replaceAll('-', '_')]}></img>
        <img className="pokemon-sprite" src={pokemon.sprites.front_default}></img>
      </div>
    </div>
  );
};
