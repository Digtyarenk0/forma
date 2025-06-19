# Project Setup Instructions

## Quick Start

### Frontend

1. Copy environment file:
   ```bash
   cp fe/.env.example fe/.env
   ```
2. Install dependencies:
   ```bash
   cd fe
   yarn install
   ```
3. Start the frontend:
   ```bash
   yarn start
   ```

### Backend

1. Copy environment file:
   ```bash
   cp be/.env.example be/.env
   ```
2. Build and run with Docker Compose:
   ```bash
   cd be
   docker compose up --build
   ```

## Prerequisites

- Node.js
- Yarn package manager
- PostgreSQL
- Redis

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
