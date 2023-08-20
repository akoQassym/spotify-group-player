import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const HomePage = () => {
  return (
    <HomeDiv>
      <h1>Spotify Group Player</h1>
      <HomeBtnGroup>
        <HomeBtnJoin to="/join">Connect</HomeBtnJoin>
        <HomeBtnCreate to="/create">Create a Room</HomeBtnCreate>
        <HomeBtnInfo to="/info">Info</HomeBtnInfo>
      </HomeBtnGroup>
    </HomeDiv>
  );
};

export default HomePage;

const HomeDiv = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 40px',

  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: 16,

  '& h1': {
    textAlign: 'center',
  },
});

const HomeBtnGroup = styled('div')({
  display: 'flex',
  flexDirection: 'row',
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
