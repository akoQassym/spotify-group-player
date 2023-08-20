import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

const Info = () => {
  return (
    <HomeDiv>
      <h1>Info</h1>
      <Description align="left">
        What is this Spotify Group Player project is all about? It is a website
        that allows people from multiple devices to connect to a single room to
        listen and control the music streamed from the host's personal Spotify
        account.
      </Description>
      <Description align="left">
        Used Stack and Technologies: Django, React, Webpack, SCSS, Babel
      </Description>
      <Description align="left">Created: May 2021</Description>
      <Description align="left">Author: Aknur Kassym</Description>
      <HomeBtnGroup>
        <HomeBtnJoin to="/join">Connect</HomeBtnJoin>
        <HomeBtnCreate to="/create">Create a Room</HomeBtnCreate>
        <HomeBtnInfo to="/">Back to HomePage</HomeBtnInfo>
      </HomeBtnGroup>
    </HomeDiv>
  );
};

export default Info;

const HomeDiv = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 40px',
  width: 600,

  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: 16,

  '& h1': {
    textAlign: 'center',
  },
});

const Description = styled(Typography)({
  fontSize: 16,
  margin: '10px 0',
});

const HomeBtnGroup = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  margin: '12px 0 0 0',
});

const HomeBtn = styled(Link)(({ theme }) => ({
  margin: 10,
  padding: '15px 35px',
  fontSize: 23,
  boxShadow: '-6px 6px 0 black',
  transition: 'all 0.3s ease-in-out',
  color: 'black',
  textDecoration: 'none',

  '&:hover': {
    boxShadow: 'none',
    transform: 'translate(-6px, 6px)',
  },
}));

const HomeBtnCreate = styled(HomeBtn)({
  backgroundColor: 'greenyellow',
});

const HomeBtnJoin = styled(HomeBtn)({
  backgroundColor: 'rgb(223, 94, 94)',
});

const HomeBtnInfo = styled(HomeBtn)({
  backgroundColor: 'gray',
});
