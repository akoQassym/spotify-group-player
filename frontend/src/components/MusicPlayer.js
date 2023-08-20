import { Typography, IconButton, LinearProgress, Box } from '@mui/material';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import { Container, styled } from '@mui/system';

const MusicPlayer = (props) => {
  const pauseSong = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('/spotify/pause', requestOptions);
  };

  const playSong = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('/spotify/play', requestOptions);
  };

  const skipSong = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('/spotify/skip', requestOptions);
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedTime;
  };

  const songProgress = (props.time / props.duration) * 100;

  return (
    <PlayerWrapper>
      <Box>
        <AlbumCover src={props.image_url} alt="Album cover" />
        <Container>
          <Typography
            color="#ffffff"
            component="h5"
            variant="h5"
            fontWeight={'bold'}
            align="center"
          >
            {props.title}
          </Typography>
          <Typography color="#cccccc" variant="subtitle1" align="center">
            {props.artist}
          </Typography>
          <ProgressContainer>
            <Typography color="#cccccc" variant="subtitle2">
              {formatTime(props.time)}
            </Typography>
            <ProgressBar variant="determinate" value={songProgress} />
            <Typography color="#cccccc" variant="subtitle2">
              {formatTime(props.duration)}
            </Typography>
          </ProgressContainer>
          <ButtonsContainer>
            <PlayerButton disabled>
              <SkipPreviousRoundedIcon fontSize="medium" />
            </PlayerButton>
            <LargePlayerButton
              onClick={() => (props.is_playing ? pauseSong() : playSong())}
            >
              {props.is_playing ? (
                <PauseCircleFilledRoundedIcon fontSize="large" />
              ) : (
                <PlayCircleFilledRoundedIcon fontSize="large" />
              )}
            </LargePlayerButton>
            <PlayerButton onClick={skipSong}>
              <SkipNextRoundedIcon fontSize="medium" />
            </PlayerButton>
          </ButtonsContainer>
        </Container>
      </Box>
    </PlayerWrapper>
  );
};

export default MusicPlayer;

const PlayerWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '20px 5px',
  boxShadow:
    'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
  background: 'rgba(0, 0, 0, 0.4)',
  borderRadius: 16,
  backdropFilter: 'blur(13px)',
  WebkitBackdropFilter: 'blur(13px)',
});

const AlbumCover = styled('img')({
  width: '350px',
  height: '350px',
  margin: '20px 20px 30px 20px',
  borderRadius: 15,
  display: 'block',
});

const ProgressContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '30px 0px 20px 0px',
  width: '350px',
});

const ProgressBar = styled(LinearProgress)({
  margin: '0 10px 0 10px',
  cursor: 'pointer',
  width: 250,

  '& span': {
    backgroundColor: 'white',
  },
});

const ButtonsContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const PlayerButton = styled(IconButton)({
  width: 70,
  height: 70,
  margin: '10px, 20px',
  color: 'white',

  '& .MuiSvgIcon-root': {
    fontSize: 45,
  },
});

const LargePlayerButton = styled(PlayerButton)({
  '& .MuiSvgIcon-root': {
    fontSize: 70,
  },
});
