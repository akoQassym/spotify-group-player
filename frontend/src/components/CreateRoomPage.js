import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Typography, Collapse, Alert } from '@mui/material';

const CreateRoomPage = ({
  guestCanPause,
  votesToSkip,
  roomCode,
  updateCallBack,
  update,
  updateShowSettingsCallBack,
}) => {
  const navigate = useNavigate();
  const [guestCanPauseFlag, setGuestCanPauseFlag] = useState(
    guestCanPause ?? true,
  );
  const [skipVotes, setSkipVotes] = useState(votesToSkip ?? 1);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleVotesChange = (e) => {
    setSkipVotes(e.target.value);
  };

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPauseFlag(e.target.value === 'True');
  };

  const handleCreateRoomBtn = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guest_can_pause: guestCanPauseFlag,
        votes_to_skip: skipVotes,
      }),
    };
    fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => navigate('/room/' + data.code));
  };

  const handleUpdateRoomBtn = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: roomCode,
        guest_can_pause: guestCanPauseFlag,
        votes_to_skip: skipVotes,
      }),
    };
    fetch('/api/update-room', requestOptions).then((response) => {
      if (response.ok) {
        setSuccessMsg('Updates were completed successfully!');
      } else {
        setErrorMsg('Error! Could not update the information.');
      }
      updateCallBack();
    });
  };

  const renderCreateBtn = () => {
    return (
      <BtnsDiv>
        <CreateBtn onClick={handleCreateRoomBtn}>Create a Room</CreateBtn>
        <ReturnBtn to="/">Back</ReturnBtn>
      </BtnsDiv>
    );
  };

  const renderUpdateBtn = () => {
    return (
      <BtnsDiv>
        <CreateBtn onClick={handleUpdateRoomBtn}>
          Update the Room Info
        </CreateBtn>
        <ReturnBtn
          onClick={() => {
            updateShowSettingsCallBack(false);
          }}
        >
          Back
        </ReturnBtn>
      </BtnsDiv>
    );
  };

  const title = update ? 'Update Room Settings' : 'Create a Room';

  return (
    <CreateDiv>
      <Collapse in={errorMsg !== '' || successMsg !== ''}>
        {successMsg !== '' ? (
          <Alert severity="success" onClose={() => setSuccessMsg('')}>
            {successMsg}
          </Alert>
        ) : (
          <Alert severity="error" onClose={() => setErrorMsg('')}>
            {errorMsg}
          </Alert>
        )}
      </Collapse>
      <Typography
        color="#202020"
        component="h5"
        variant="h5"
        fontWeight={'bold'}
        align="center"
      >
        {title}
      </Typography>
      <Typography
        color="#202020"
        variant="subtitle1"
        align="left"
        sx={{ margin: '10px 0 0 0' }}
      >
        Choose what the guests are allowed to do:
      </Typography>
      <CreateForm>
        <div>
          <input
            type="radio"
            id="guestControlChoice1"
            name="radioGroup"
            value="True"
            checked={guestCanPauseFlag}
            onChange={handleGuestCanPauseChange}
          />
          <label htmlFor="guestControlChoice1">Pause/Play</label>
        </div>
        <div>
          <input
            type="radio"
            id="guestControlChoice2"
            name="radioGroup"
            value="False"
            checked={!guestCanPauseFlag}
            onChange={handleGuestCanPauseChange}
          />
          <label htmlFor="guestControlChoice2">Nothing</label>
        </div>
        <Typography
          color="#202020"
          variant="subtitle1"
          align="left"
          sx={{ margin: '10px 0 0 0' }}
        >
          Number of votes to skip the song:
        </Typography>
        <input
          type="number"
          defaultValue={skipVotes}
          onChange={handleVotesChange}
        />
        {update ? renderUpdateBtn() : renderCreateBtn()}
      </CreateForm>
    </CreateDiv>
  );
};

export default CreateRoomPage;

const CreateDiv = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  padding: '20px 40px',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: 16,
});

const CreateForm = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const BtnsDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const ReturnBtn = styled(Link)({
  margin: '25px 0',
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

const CreateBtn = styled('button')({
  margin: '15px 0',
  padding: '1em 2em',
  border: '2px solid rgb(106, 163, 137)', // Replace with actual color
  borderRadius: '1em',
  background: 'rgb(205, 255, 232)', // Replace with actual color
  transformStyle: 'preserve-3d',
  transition: 'all 175ms cubic-bezier(0, 0, 1, 1)',
  '&:before': {
    position: 'absolute',
    content: '""',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgb(150, 232, 195)', // Replace with actual color
    borderRadius: 'inherit',
    boxShadow: '0 0 0 2px rgb(121, 186, 156), 0 0.75em 0 0 rgb(106, 163, 137)', // Replace with actual colors
    transform: 'translate3d(0, 0.75em, -1em)',
    transition: 'all 175ms cubic-bezier(0, 0, 1, 1)',
  },
  '&:hover': {
    background: 'rgb(187, 232, 211)', // Replace with actual color
    transform: 'translate(0, 0.375em)',
  },
  '&:hover:before': {
    transform: 'translate3d(0, 0.75em, -1em)',
  },
  '&:active': {
    transform: 'translate(0em, 0.75em)',
  },
  '&:active:before': {
    transform: 'translate3d(0, 0, -1em)',
    boxShadow: '0 0 0 2px rgb(121, 186, 156), 0 0.25em 0 0 rgb(121, 186, 156)', // Replace with actual colors
  },
});
