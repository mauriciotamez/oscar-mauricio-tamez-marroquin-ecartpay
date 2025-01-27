# GPU World E-commerce Platform

A modern e-commerce platform built with Vue.js, NestJS, and MySQL in a monorepo architecture.
   
   - With love, Mauricio 🖤

## 🚀 Tech Stack

- **Frontend**: Vue 3 + TypeScript + Vite
- **Backend**: NestJS + Prisma + MySQL🖤
- **Architecture**: Monorepo using Turborepo
- **Containerization**: Docker & Docker Compose
- **Type Safety**: TypeScript throughout the stack

## 🛠️ Prerequisites

- Docker and Docker Compose
- Node.js >=22.13.1
- npm >=10.2.4

## 🏃‍♂️ Quick Start

1. Clone the repository:

```
git clone https://github.com/mauriciotamez/oscar-mauricio-tamez-marroquin-ecartpay.git
```
```
cd oscar-mauricio-tamez-marroquin-ecartpay
```

3. Start the application:
```
docker-compose up --build
```

4. Access the applications:
- Frontend: http://localhost:3002
- API: http://localhost:3000
- API Documentation: http://localhost:3000/api

## 📁 Project Structure

    
    |── apps/                  
    |   |── web/           # Vue.js frontend
    |   |── api/           # NestJS backend
    |── packages/          # Shared packages                    
    |── docker-compose.yml # Docker composition                     
    |── package.json       # root package.json
    |── turbo.json         # turbo monorepo config
    └── README.md


## 🗄️ Database

The database structure is automatically created and seeded when running `docker-compose up`. The process includes:

1. Prisma migrations
2. Initial seed data for:
   - Product catalog and images
   - User accounts
   - Access tokens

## 🔑 Authentication

For testing purposes, use the following token to create/modify and upload images to the product module:
```
Bearer admin_token_123
```

## 🛠️ Development

To develop locally:

1. Start the containers:
```
docker-compose up
```


2. The development servers will start with hot-reload enabled:
   - Frontend changes will reflect immediately
   - Backend changes will trigger automatic restart

## 📝 API Documentation

API documentation is available at http://localhost:3000/api when the server is running.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details