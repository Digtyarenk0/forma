# Project Setup Instructions

## Prerequisites

- Node.js
- Yarn package manager
- PostgreSQL
- Redis

## Installation

1. Install dependencies:

```bash
yarn install
```

## Backend Setup (BE)

1. Navigate to the backend directory:

```bash
cd be
```

2. Create a `.env` file with the following variables:

```
## All envs inject in src/config

# Front end URL
APP_URL=http://localhost:5173

# Setup
PORT=5001
LOGS=false # Full logging

# JWT
JWT_SECRET_ACCESS=secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Redis
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD= # optional

# Database
POSTGRES_HOST=localhost
POSTGRES_DB=forma
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
POSTGRES_PORT=5432

```

3. Run database migrations:

```bash
yarn migration:run
```

4. Return to the root directory:

```bash
cd ..
```

## Frontend Setup (FE)

1. Navigate to the frontend directory:

```bash
cd fe
```

2. Rename `.env.example` to `.env`:

```bash
mv .env.example .env
```

3. Return to the root directory:

```bash
cd ..
```

## Running the Project

From the root directory, start the project:

```bash
yarn start
```

## Docker Setup (In Progress)

The Docker setup for this project is currently under development and not yet ready for use.

#### Shotdown

```bash
docker compose down
```

#### Build

```bash
docker compose build --no-cache
```

#### Start

```bash
docker compose up
```

## Background Services

### Cron Service

The project includes a cron service that runs every 5 minutes to:

- Collect all pending projects that need parsing
- Send them to a queue for processing

### Consumer Service

The consumer service processes the queue by:

- Using GitHub API to parse project data
- Updating records in the database in queue order
- Processing one project at a time to maintain data consistency
