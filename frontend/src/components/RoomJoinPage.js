import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const RoomJoinPage = (props) => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    setError('');
  };

  const handleJoinClick = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: code,
      }),
    };
    fetch('/api/join-room', requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${code}`);
        } else {
          setError('Неверный код группы');
        }
      })
      .catch((error) => {});
  };

  return (
    <JoinDiv>
      <Title>Join a Room</Title>
      <ErrorText>{error}</ErrorText>
      <CodeInput
        type="text"
        id="codeInput"
        placeholder="Type the room code"
        error={error !== ''}
        onChange={handleCodeChange}
      />
      <JoinBtn onClick={handleJoinClick}>Join</JoinBtn>
      <ReturnBtn to="/">Back</ReturnBtn>
    </JoinDiv>
  );
};

export default RoomJoinPage;

const JoinDiv = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  width: 500,
  padding: '20px 40px',

  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: 16,
});

const Title = styled('h1')({
  textAlign: 'center',
});

const ErrorText = styled('p')({
  color: 'red',
  margin: 0,
});

const CodeInput = styled('input')(({ error }) => ({
  textTransform: 'uppercase',
  height: '30px',
  fontSize: '25px',
  padding: '3px 5px',
  border: error ? '1px solid red' : '1px solid rgb(106, 163, 137)', // $colorShadeA
}));

const JoinBtn = styled('button')({
  margin: '10px 0',
  padding: '1em 2em',
  border: '2px solid rgb(106, 163, 137)', // $colorShadeA
  borderRadius: '1em',
  background: 'rgb(205, 255, 232)', // $colorShadeE
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
    background: 'rgb(150, 232, 195)', // $colorShadeC
    borderRadius: 'inherit',
    boxShadow: '0 0 0 2px rgb(121, 186, 156), 0 0.75em 0 0 rgb(106, 163, 137)', // $colorShadeB, $colorShadeA
    transform: 'translate3d(0, 0.75em, -1em)',
    transition: 'all 175ms cubic-bezier(0, 0, 1, 1)',
  },
  '&:hover': {
    background: 'rgb(187, 232, 211)', // $colorShadeD
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
    boxShadow: '0 0 0 2px rgb(121, 186, 156), 0 0.25em 0 0 rgb(121, 186, 156)', // $colorShadeB
  },
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
