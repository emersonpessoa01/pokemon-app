import React, { useState, useEffect } from 'react';
import PokemonDataService from '../services/PokemonService';

const Pokemon = (props) => {
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
  const [currentPokemon, setCurrentPokemon] = useState(initialPokemonState);
  const [message, setMessage] = useState('');

  const getPokemon = (id) => {
    PokemonDataService.get(id)
      .then((response) => {
        setCurrentPokemon(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPokemon(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { Pokemon, value } = event.target;

    setCurrentPokemon({ ...currentPokemon, [Pokemon]: value });
  };

  const updateActive = (status) => {
    var data = {
      id: currentPokemon.id,
      Pokemon: currentPokemon.Pokemon,
      GIF: currentPokemon.GIF,
      HP: currentPokemon.HP,
      Attack: currentPokemon.Attack,
      Defense: currentPokemon.Defense,
      Speed: currentPokemon.Speed,

      Description: status,
    };
    PokemonDataService.update(currentPokemon.id, data)
      .then((response) => {
        setCurrentPokemon({ ...currentPokemon, Description: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updatePokemon = () => {
    PokemonDataService.update(currentPokemon.id, currentPokemon)
      .then((response) => {
        console.log(response.data);
        setMessage('The pokemon was updated successfully!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePokemon = () => {
    PokemonDataService.remove(currentPokemon.id)
      .then((response) => {
        console.log(response.data);
        props.history.push('/pokemon');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPokemon ? (
        <div className="edit-form">
          <h4>Pokemon</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentPokemon.Pokemon}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="img">Image</label>
              <input
                type="text"
                className="form-control"
                id="img"
                name="img"
                value={currentPokemon.GIF}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="hp">HP</label>
              <input
                type="number"
                className="form-control"
                id="hp"
                name="hp"
                value={currentPokemon.hp}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="attack">Attack</label>
              <input
                type="number"
                className="form-control"
                id="attack"
                name="attack"
                value={currentPokemon.Attack}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="defense">Defense</label>
              <input
                type="number"
                className="form-control"
                id="defense"
                name="defense"
                value={currentPokemon.Defense}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="speed">Speed</label>
              <input
                type="number"
                className="form-control"
                id="speed"
                name="speed"
                value={currentPokemon.Speed}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentPokemon.Description ? 'Ativo' : 'Desativado'}
            </div>
          </form>

          {currentPokemon.Description ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateActive(false)}
            >
              Desativar
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateActive(true)}
            >
              Ativar
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deletePokemon}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updatePokemon}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Pokemon...</p>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
