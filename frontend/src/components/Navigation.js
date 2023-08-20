import { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import HomePage from './HomePage';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import Info from './Info';

const PrivateRoute = ({ roomCode, redirectUrl, children }) => {
  return roomCode == null ? children : <Navigate to={redirectUrl} />;
};

const Navigation = () => {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    fetch('/api/user-in-room')
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
      });
  }, []);

  const handleLeaveRoomCallBack = () => {
    setRoomCode(null);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PrivateRoute redirectUrl={`/room/${roomCode}`} roomCode={roomCode}>
          <HomePage />
        </PrivateRoute>
      ),
    },
    {
      path: '/join',
      element: <RoomJoinPage />,
    },
    {
      path: '/create',
      element: <CreateRoomPage />,
    },
    {
      path: '/info',
      element: <Info />,
    },
    {
      path: '/room/:roomCode',
      element: <Room leaveRoomCallBack={handleLeaveRoomCallBack} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Navigation;
