# BetOdds

A real-time sports betting application that provides live odds updates and betting capabilities using TypeScript, Express.js, Socket.IO, and Kafka.

## Features

- 🚀 Real-time odds updates via WebSocket
- 📊 Live betting functionality
- 🔄 Kafka message streaming
- 🔒 Secure authentication system
- 📱 RESTful API endpoints
- 🐳 Docker containerization
- 💪 Strong TypeScript typing

## Project Structure

```
betodds/
├── .husky/              # Git hooks configuration
├── .vscode/             # VS Code specific settings
├── dist/                # Compiled output
├── node_modules/        # Project dependencies
├── src/                 # Source code
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
├── app-types.d.ts      # Application type declarations
├── biome.json          # Biome configuration
├── docker-compose.yml  # Docker compose configuration
├── Dockerfile          # Docker build instructions
├── package.json        # Project metadata and dependencies
├── README.md           # Project documentation
├── test-client.html    # Test client
├── tsconfig.json       # TypeScript configuration
└── yarn.lock           # Yarn dependency lock file
```

## Prerequisites

- Node.js (v20 or higher)
- Yarn package manager
- Docker and Docker Compose
- Kafka
- MongoDb

## Postman Collection
betodds.postman_collection.json

## TODO
- Cache Implementation
- Add more test coverage
- Documentation
- Bet Fraud Analysis
- Clean up and optimization

## Docker Setup
The server will start on `http://localhost:4000` with hot reloading enabled.

1. Build and start the containers:
```bash
docker-compose up -d --build
```

2. Stop the containers:
```bash
docker-compose down 
```

## Available Scripts

- `yarn dev`: Start development server
- `yarn build`: Build for production
- `yarn start`: Start production server
- `yarn lint`: Run Biome linter
- `yarn test`: Run tests
- `yarn prepare`: Install Husky hooks

## API Endpoints

### Authentication
- `POST /v1/api/auth/login`: User login
- `POST /v1/api/auth/signup`: User registration

### Betting
- `GET /v1/api/bet`: Get history
- `POST /v1/api/bet`: Place a bet

## Testing

Run the test suite:
```bash
yarn test
```

## Deployment


## Built With

- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Express.js](https://expressjs.com/) - Web framework
- [Socket.IO](https://socket.io/) - Real-time engine
- [Kafka](https://kafka.apache.org/) - Message streaming
- [Biome](https://biomejs.dev/) - Linting and formatting
- [Docker](https://www.docker.com/) - Containerization

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape BetOdds
- Special thanks to the open-source community

## Support

For support, email nicholaschunrayne@gmail.com or open an issue in the repository.
