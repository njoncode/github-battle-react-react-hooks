import React from 'react';
import queryString from 'query-string';
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { battleApiCall } from '../utils/api';
import Loading from './Loading';
import Tooltip from './Tooltip';
import Card from './Card';
// We are not using a default export, so we are using named imports to import just this function. We don't care about fetch popular repos.

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <a href={profile.html_url}>{profile.login}</a>
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's location">
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's Company">
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
      <li>
        <FaCode color="rgb(129, 195, 245)" size={22} />
        {profile.public_repos.toLocaleString()} repositories
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};

const BattleReducer = (state, action) => {
  if (action.type === 'success') {
    return {
      winner: action.winner,
      loser: action.loser,
      error: null,
      loading: false,
    };
  }
  if (action.type === 'error') {
    return {
      ...state,
      error: action.message,
      loading: false,
    };
  }
  throw new Error('This action type is not supported');
};

export default function Results(props) {
  const { playerOne, playerTwo } = queryString.parse(location.search);

  const [state, dispatch] = React.useReducer(BattleReducer, {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  });

  // componentDidMount () {

  //   battle([playerOne, playerTwo])
  //     .then((players) => console.log('data: ', players))
  // }

  React.useEffect(() => {
    // debugger;
    // const { playerOne, playerTwo } = props;
    battleApiCall([playerOne, playerTwo])
      .then((players) => {
        console.log('BattleApiCall: players: ', players);
        dispatch({ type: 'success', winner: players[0], loser: players[1] });
      })
      .catch(({ message }) => dispatch({ type: 'error', message }));
  }, [playerOne, playerTwo]);

  const { winner, loser, error, loading } = state;

  if (loading === true) {
    return <Loading text="Battling" />;
  }

  if (error) {
    return <p className="center-text error">{error}</p>;
  }

  // {
  //   loading === true && (
  //     <h3>
  //       <Loading text="Battling" />
  //     </h3>
  //   );
  // }
  // {
  //   error === true && <h2>{error}</h2>;
  // }

  return (
    <>
      <div className="grid space-around container-sm">
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Winner'}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ProfileList profile={winner.profile} />
        </Card>
        <Card
          header={winner.score === loser.score ? 'Tie' : 'Loser'}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          name={loser.profile.login}
          href={loser.profile.html_url}
        >
          <ProfileList profile={loser.profile} />
        </Card>
      </div>
      <Link to="/Battle" className="btn dark-btn btn-space">
        Reset
      </Link>
    </>
  );
}

//   return (
//     <>
//       Results
//       <h2>{winner.score === loser.score ? 'Tie' : 'Winner'}</h2>
//       <h3>Score: {winner.score}</h3>
//       {/* <a href={winner.profile.html_url}>{winner.profile.login}</a> */}
//       <ProfileList profile={winner.profile} />
//       {/* <pre>{JSON.stringify(winner, null, 2)}</pre> */}
//       <h2>{winner.score === loser.score ? 'Tie' : 'Loser'}</h2>
//       <h3>Score: {loser.score}</h3>
//       <ProfileList profile={loser.profile} />
//       {/* <pre>{JSON.stringify(loser, null, 2)}</pre> */}
//     </>
//   );
// }

/**
 * useReducer that allows you to add state to a function component but manage that state using the reducer pattern.
    useReducer returns an array with the first element being the state and the second element being a dispatch function which when called, will invoke the reducer.


    const [state, dispatch] = React.useReducer(
      reducer, 
      initialState
    )

    function reducer (state, action) {

    }


When invoked, whatever you pass to dispatch will be passed as the second argument to the reducer (which we’ve been calling action). The first argument (which we’ve been calling state) will be passed implicitly by React and will be whatever the previous state value was. 
action would be an object

reducer function is passed the current state as the first argument, it’s simple to update one piece of state based on another piece of state. 
Whenever updating one piece of state depends on the value of another piece of state, reach for useReducer.


* If different pieces of state update independently from one another (hovering, selected, etc.), useState should work fine. 
If our state tends to be updated together or if updating one piece of state is based on another piece of state, we should go with useReducer.


 */

/**  
  *     Reset

      <button 
        onClick={onReset}
        className="btn dark-btn btn-space">
          Reset
      </button>

  Instead of having a button, we are having a link. We will grab that link from 'react-router'.
  And now whenever the user clicks on this button, instead of calling props on reset, all we want to do is take them back to the battle route.

  
  * <Link to="/Battle" className="btn dark-btn btn-space">
        Reset
      </Link>
  * 
  * 
  */
