# Spotify Group Player

Spotify Group Player is a dynamic and engaging web application that lets users from various devices converge in a virtual room to collectively enjoy and control music streamed directly from the host's personal Spotify account. With its seamless integration of Django, React, Spotify Developer API, and an array of modern technologies, this project offers an immersive music-sharing experience.

![Homepage](/screenshots/homepage.png)

## Features

- **Create and Join Rooms**: Users can effortlessly create and enter virtual rooms, each with a unique room code generated automatically. This facilitates a shared musical experience among friends and fellow music enthusiasts.

- **Virtual Player Controls**: The room is equipped with an intuitive virtual player, complete with play, pause, skip, and volume control buttons. Everyone connected to the room can participate in managing the playlist, enhancing collaboration and interaction.

![Room](/screenshots/room.png)

- **Spotify Integration**: The integration of the Spotify Developer API allows the host to stream music directly from their personal Spotify account. This ensures a vast and diverse music library, providing an exceptional listening experience for all room participants.

- **OAuth 2.0 Authorization**: Users can securely log in using their Spotify credentials, leveraging the OAuth 2.0 authentication protocol. This enables a streamlined and secure login process, ensuring the privacy and security of user data.

- **Voting System**: The built-in voting system empowers room participants to collectively decide on skipping a track. This interactive feature encourages engagement and democratizes the music selection process.

## Screenshots

### Home Page

![Home Page](/screenshots/home.png)

### Creating a Room

![Create Room](/screenshots/create-room.png)

### Room Experience

![Room Experience](/screenshots/room-experience.png)

## Technologies Used

- Frontend: React, Webpack, Babel, SASS, Material UI
- Backend: Django
- Spotify Developer API for music streaming and integration
- OAuth 2.0 for secure user authentication

## Getting Started

To run this project locally, follow these steps:

1. Clone the GitHub repository: `git clone https://github.com/akoQassym/spotify-group-player.git`
2. Navigate to the project directory: `cd spotify-group-player`
3. Install frontend dependencies: `cd frontend && npm install`
4. Install backend dependencies: `cd .. && pip install -r requirements.txt`
5. Set up environment variables for Spotify Developer API credentials and other configuration.
6. Start the backend server: `python manage.py runserver`
7. In a separate terminal, start the frontend development server: `cd frontend && npm run dev`

Visit `http://localhost:8000` in your browser to access the application.

## Contribution

Contributions to this project are welcome! Feel free to open issues or submit pull requests for bug fixes, enhancements, or new features.

## License

This project is licensed under the [MIT License](/LICENSE).

---

Experience the joy of shared music with Spotify Group Player! Connect, collaborate, and groove together. If you have any questions or feedback, please don't hesitate to contact us at [contact@spotifygroupplayer.com](mailto:contact@spotifygroupplayer.com).
