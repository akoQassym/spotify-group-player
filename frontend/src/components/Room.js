import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Components.module.scss';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';
import { styled } from '@mui/system';

const Room = (props) => {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [song, setSong] = useState({});

  const navigate = useNavigate();
  const { roomCode } = useParams();

  useEffect(() => {
    getRoomDetails();
    const interval = setInterval(getCurrentSong, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRoomDetails = () => {
    fetch('/api/get-room' + '?code=' + roomCode)
      .then((response) => {
        if (!response.ok) {
          props.leaveRoomCallBack();
          navigate('/');
        }
        return response.json();
      })
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
        if (data.is_host) {
          authenticateSpotify();
        }
      });
  };

  const authenticateSpotify = () => {
    fetch('/spotify/is-authenticated')
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        if (!data.status) {
          fetch('/spotify/get-auth-url')
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  };

  const getCurrentSong = () => {
    fetch('/spotify/current-song')
      .then((response) => {
        return response.ok ? response.json() : {};
      })
      .then((data) => {
        setSong(data);
      })
      .catch(() => {});
  };

  const handleLeaveBtn = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('/api/leave-room', requestOptions).then((_response) => {
      props.leaveRoomCallBack();
      navigate('/');
    });
  };

  const updateShowSettings = (value) => {
    setShowSettings(value);
  };

  const renderSettingsBtn = () => {
    return (
      <ReturnButton onClick={() => updateShowSettings(true)}>
        Room settings
      </ReturnButton>
    );
  };

  const renderSettings = () => {
    return (
      <CreateRoomPage
        update={true}
        votesToSkip={votesToSkip}
        guestCanPause={guestCanPause}
        roomCode={roomCode}
        updateCallBack={getRoomDetails}
        updateShowSettingsCallBack={updateShowSettings}
      />
    );
  };

  if (showSettings) {
    return renderSettings();
  } else {
    return (
      <Container>
        <PlayerPanel>
          <MusicPlayer {...song} />
        </PlayerPanel>
        <StyledH1 data-shadow={roomCode}>{roomCode}</StyledH1>
        {isHost ? renderSettingsBtn() : null}
        <ReturnButton onClick={handleLeaveBtn}>Exit the Room</ReturnButton>
      </Container>
    );
  }
};

export default Room;

const Container = styled('div')({
  width: 400,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
});

const PlayerPanel = styled('div')({
  margin: 20,
  display: 'flex',
  alignItems: 'center',
});

const StyledH1 = styled('h1')({
  display: 'inline-block',
  color: 'white',
  fontFamily: 'Roboto, serif',
  fontSize: '35px',
  textShadow: '.1em .1em 0 black',
  position: 'relative',
  margin: 0,
  letterSpacing: 5,
});

const StyledButton = styled('button')({
  margin: '10px 0 5px',
  transition: 'all 0.5s',
  cursor: 'pointer',
  lineHeight: 2,
  fontSize: '16px',
});

const ReturnButton = styled(StyledButton)({
  width: '100%',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '16px',
  textDecoration: 'none',
  color: '#000',
  cursor: 'pointer',
  border: '3px solid',
  padding: '0.25em 0.5em',
  boxShadow:
    '1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px',
  position: 'relative',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  touchAction: 'manipulation',
  '&:active': {
    boxShadow: '0px 0px 0px 0px',
    top: '5px',
    left: '5px',
  },
  '@media (min-width: 768px)': {
    padding: '0.25em 0.75em',
  },
});
