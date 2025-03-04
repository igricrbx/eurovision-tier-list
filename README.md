# Eurovision Tier List Maker

A web application for creating, sharing, and comparing Eurovision Song Contest 2025 tier lists.

## Features

- **Create Tier Lists**: Drag and drop Eurovision contestants into A, B, C, D, E, F tiers
- **Share Your Rankings**: Generate unique share links to show others your tier list
- **User Accounts**: Register with email and password to save your tier lists
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional interface using Material UI

## Tech Stack

This is a monorepo project using:

- **Yarn Workspaces**: For managing multiple packages
- **TypeScript**: For type safety across the codebase
- **React**: Frontend UI library
- **Material UI**: Component library for consistent design
- **React Beautiful DND**: For drag and drop functionality
- **Express**: Backend API server
- **TypeORM**: Database ORM for interacting with PostgreSQL
- **PostgreSQL**: Relational database
- **JWT**: Authentication

## Project Structure

```
eurovision-tier-list/
└── packages/
    ├── client/         # React frontend
    └── server/         # Express backend
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v16.x or higher
- **npm**: v8.x or higher (comes with Node.js)
- **Yarn**: v1.22.x or higher (`npm install -g yarn`)
- **PostgreSQL**: v14.x or higher
- **Git**: For repository cloning

### Supported Operating Systems:
- Linux (Ubuntu 20.04+, Debian 11+)
- macOS (Catalina 10.15+)
- Windows 10/11 (with WSL2 recommended for optimal experience)

## Setup Instructions

### 1. Create Database

```bash
sudo -u postgres psql
```

In the PostgreSQL prompt:

```sql
CREATE DATABASE eurovision_tier_list;
CREATE USER eurovision WITH ENCRYPTED PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE eurovision_tier_list TO eurovision;
\q
```

### 2. Clone and Install Dependencies

```bash
git clone https://github.com/igricrbx/eurovision-tier-list
cd eurovision-tier-list
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the server directory based on the `.env.example`:

```bash
cp packages/server/.env.example packages/server/.env
```

Edit the `.env` file with your database credentials.

### 4. Start Development Environment

```bash
# Seed the database with 2025 contestants
yarn seed

# Start both client and server
yarn start
```

The client will run on http://localhost:3000 and the server on http://localhost:5000.

## Testing

Run the test suite with:

```bash
yarn test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Deployment

For production deployment, build both packages:

```bash
yarn build
```

Then deploy the built files to your hosting environment.

## License

See the [LICENSE](./LICENSE.md) file for details.
