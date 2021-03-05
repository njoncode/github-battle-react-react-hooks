import React from 'react';
import ReactDOM from 'react-dom';
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Results from './Results';
import ThemeContext from '../contexts/theme';

function Instructions() {
  const theme = React.useContext(ThemeContext);
  return (
    <div className="instructions-container">
      <h1 className="center-text header-lg">INSTRUCTIONS</h1>
      <ol className="container-sm grid center-text battle-instructions">
        <li>
          <h3 className="header-sm">Enter two Github users</h3>
          <FaUserFriends
            className={`bg-${theme}`} // className will be either "bg-light" or "bg-dark" depending on what the theme is.
            color="rgb(255, 191,116)"
            size={140}
          />
        </li>
        <li>
          <h3 className="header-sm">Battle</h3>
          <FaFighterJet
            className={`bg-${theme}`}
            color="rgb(255, 191,116)"
            size={140}
          />
        </li>
        <li>
          <h3 className="header-sm">See the Winners</h3>
          <FaTrophy
            className={`bg-${theme}`}
            color="rgb(255, 191,116)"
            size={140}
          />
        </li>
      </ol>
    </div>
  );
}

function PlayerInput({ onSubmit, label }) {
  const [username, setUsername] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username);
  };

  const handleChange = (event) => {
    setUsername(event.target.value); // handleChange will set the username to whatever input is given by the user.
  };

  /**
   * Then we call whatever this.props.onSubmit is passing it what our username is.
   * 
   * <PlayerInput
                label="Player One"
                onSubmit={(player) => this.handleSubmit('playerOne', player)} // onSubmit will take the player as a parameter and then will set the id to playerOne whose value will be name of the player the user entered.
              />
  */

  console.log(`!!username: ${!!username}`);

  const theme = React.useContext(ThemeContext);

  return (
    <form className="column player" onSubmit={handleSubmit}>
      <label htmlFor="username" className="player-label">
        {label}
      </label>
      <div className="row player-inputs">
        <input
          type="text"
          id="user"
          className={`input-${theme}`} // We want this to be "input-dark" if it's a dark theme & "input-light" if it's a light theme.
          placeholder="github username"
          autoComplete="off"
          value={username}
          onChange={handleChange}
        />
        <button // if the theme is light, we want a dark button and if the theme is dark then we want a light buttton.
          className={`btn ${theme === 'dark' ? 'light-btn' : 'light-button'}`}
          type="submit"
          disabled={!username} // if teh username has not been entered in the input filed, then submit button wii be diabled.
        >
          Submit
        </button>
      </div>
    </form>
  );
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

/**
 * Anytime we use the PlayerInput component, it’s required that we pass to it an onSubmit prop(which is a function) as well as a a label prop (which is a string).
 * If these two props are not included as props or they are not of type function & string respectively, then a warning will be shown in the console.
 */

/**
 * PlayerPreview will render the:
 * player's label.  (For 1st player, label is Player One & fro 2nd player label is p layer Two)
 * player's avatar.
 * player's username (which when clicked will direct the user to the player's github link).
 * And a cross icon (*) which when clicked will execute the onReset method thereby getting us the PlayerInput component again.
 *
 * onReset={() => this.handleReset('playerOne')}      (here, playerOne id will be set to null)
 * onReset={() => this.handleReset('playerTwo')}      (here, playerTwo id will be set to null)
 * onReset method will execute the handleReset method and will set the id to null.
 */

function PlayerPreview({ username, onReset, label }) {
  const theme = React.useContext(ThemeContext);

  return (
    <div className="column player">
      <h3 className="player-label">{label}</h3>
      <div className={`row bg-${theme}`}>
        <div className="player-info">
          <img
            className="avatar-small"
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a href={`https://github.com/${username}`} className="link">
            {username}
          </a>
        </div>
        <button className="btn-clear flex-center" onClick={onReset}>
          <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
        </button>
      </div>
    </div>
  );
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

/**
 * The two players that we add are gonna be living on the state.
 * playerOne and playerTwo will be set by default to null.
 */

export default function Battle() {
  const [playerOne, setPlayerOne] = React.useState(null);
  const [playerTwo, setPlayerTwo] = React.useState(null);

  // const [battle, setBattle] = React.useState(false);

  // if (battle === true) {
  //   return <Results playerOne={playerOne} playerTwo={playerTwo} />;
  // }

  const handleSubmit = (id, player) => {
    id === 'playerOne' ? setPlayerOne(player) : setPlayerTwo(player);
  };

  const handleReset = (id) => {
    id === 'playerOne' ? setPlayerOne(null) : setPlayerTwo(null);
  };

  return (
    <>
      <Instructions />
      <div className="players-container">
        <h1 className="center-text header-lg">Players</h1>
        <div className="row space-around">
          {playerOne === null ? (
            <PlayerInput
              label="Player One"
              onSubmit={(player) => handleSubmit('playerOne', player)}
            />
          ) : (
            <PlayerPreview
              username={playerOne}
              onReset={() => handleReset('playerOne')}
            />
          )}
          {playerTwo === null ? (
            <PlayerInput
              label="Player Two"
              onSubmit={(player) => handleSubmit('playerTwo', player)}
            />
          ) : (
            <PlayerPreview
              username={playerTwo}
              onReset={() => handleReset('playerTwo')}
            />
          )}
        </div>
        {playerOne != null && playerTwo != null && (
          <Link
            className="btn dark-btn btn-space"
            to={{
              pathname: '/battle/results',
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
            }}
          >
            Battle
          </Link>

          //   <button
          //   className="btn dark-btn btn-space"
          //   onClick={() => setBattle(true)}
          // >
          //   Battle
          // </button>
        )}
      </div>
    </>
  );
}

/**
      <Link
            className="btn dark-btn btn-space"
            to={{
              pathname: '/battle/results',
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,  //  Query String
            }}
          >
            Battle 
          </Link>
 
  Instead of getting the profiles of the usernames we entered, we get the profile of the user who has github.com/undefined which apparently is David
  The reason for that is because we were grabbing playerOne & playerTwo from props. But now they are no longer on props, instead they are on the query string.
  So we install a package which is gonna parse the query string that we get from react-router.


 * In Results Component
            
        const { playerOne, playerTwo } = queryString.parse(location.search);
 
  Instead of grabbing {playerOne, playerTwo} from props, we'll grab them from location.search. But we need to pass that whole string to queryString.parse (queryString.parse(location.search))
  So location.search is gonna be a string which we then parse to querystring.parse. That is going to return us an an object that has a playerOne property as well as a playerTwo property.
            
        const { playerOne, playerTwo } = queryString.parse(location.search);

 *   http://localhost:8080/battle/results?playerOne=sdras&playerTwo=tylermcginnis
 
    Now the names of the winner and loser, instead of living inside of local state, they live on the query string.

 */
