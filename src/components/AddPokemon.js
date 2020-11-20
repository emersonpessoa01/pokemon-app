import React, { useState } from 'react';
import PokemonDataService from '../services/PokemonService';

const AddPokemon = () => {
  const initialPokemonState = {
    id: null,
    Pokemon: '',
    GIF: '',
    HP: '',
    Attack: '',
    Defense: '',
    Speed: '',
    Description: '',
  };
  const [pokemon, setPokemon] = useState(initialPokemonState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { Pokemon, value } = event.target;
    setPokemon({ ...pokemon, [Pokemon]: value });
  };

  const savePokemon = () => {
    var data = {
      Pokemon: pokemon.Pokemon,
      GIF: pokemon.GIF,
      HP: pokemon.HP,
      Attack: pokemon.Attack,
      Defense: pokemon.Defense,
      Speed: pokemon.Speed,
    };

    PokemonDataService.create(data)
      .then((response) => {
        setPokemon({
          id: response.data.id,
          Pokemon: response.data.Pokemon,
          GIF: response.data.GIF,
          HP: response.data.HP,
          Attack: response.data.Attack,
          Defense: response.data.Defense,
          Speed: response.data.Speed,
          Description: response.data.Description,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newPokemon = () => {
    setPokemon(initialPokemonState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPokemon}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={pokemon.Pokemon}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="img">Imagem</label>
            <input
              type="text"
              className="form-control"
              id="img"
              required
              value={pokemon.GIF}
              onChange={handleInputChange}
              name="img"
            />
          </div>
          <div className="form-group">
            <label htmlFor="hp">HP</label>
            <input
              type="text"
              className="form-control"
              id="hp"
              required
              value={pokemon.HP}
              onChange={handleInputChange}
              name="hp"
            />
          </div>
          <div className="form-group">
            <label htmlFor="attack">Ataque</label>
            <input
              type="text"
              className="form-control"
              id="attack"
              required
              value={pokemon.Attack}
              onChange={handleInputChange}
              name="attack"
            />
          </div>
          <div className="form-group">
            <label htmlFor="defense">Defesa</label>
            <input
              type="text"
              className="form-control"
              id="defense"
              required
              value={pokemon.Defense}
              onChange={handleInputChange}
              name="defense"
            />
          </div>
          <div className="form-group">
            <label htmlFor="speed">Velocidade</label>
            <input
              type="text"
              className="form-control"
              id="speed"
              required
              value={pokemon.Speed}
              onChange={handleInputChange}
              name="speed"
            />
          </div>
          <button onClick={savePokemon} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPokemon;
