# Exercise Tracker

This is a solution for the FreeCodeCamp Exercise Tracker Microservice project, part of the [FreeCodeCamp Back End Development and APIs certification](https://www.freecodecamp.org/learn/back-end-development-and-apis/).

## Project Overview

This application allows users to:
- Create a new user
- Add exercises for specific users
- Track exercises with descriptions, durations, and dates
- Retrieve exercise logs for any user

## Features

- User registration system
- Exercise logging with customizable parameters
- Comprehensive exercise logs with filtering options
- RESTful API endpoints

## Technologies Used

- Node.js
- Express.js
- MongoDB/Mongoose
- HTML/CSS for the front-end interface

## Installation

1. Clone the repository:
```
git clone https://github.com/kurogamidesuu/Exercise-Tracker-FCC-project.git
```

2. Navigate to the project directory:
```
cd Exercise-Tracker-FCC-project
```

3. Install dependencies:
```
npm install
```

4. Set up environment variables:
- Create a `.env` file in the root directory
- Add your MongoDB connection string: `MONGO_URI=your-mongodb-connection-string`

5. Start the application:
```
npm start
```

## API Endpoints

### Create a New User
- **POST** `/api/users`
  - Body: `{ username: String }`
  - Returns: `{ _id: String, username: String }`

### Create a New Exercise
- **POST** `/api/users/:_id/exercises`
  - Body: `{ description: String, duration: Number, date: Date (optional) }`
  - Returns: `{ _id: String, username: String, description: String, duration: Number, date: Date }`

### Get User's Exercise Log
- **GET** `/api/users/:_id/logs`
  - Query Parameters (optional):
    - `from`: Date (yyyy-mm-dd)
    - `to`: Date (yyyy-mm-dd)
    - `limit`: Number
  - Returns: `{ _id: String, username: String, count: Number, log: Array }`

### Get All Users
- **GET** `/api/users`
  - Returns: Array of users

## Example Usage

### Creating a User
```
POST /api/users
{ "username": "exampleUser" }
```

Response:
```json
{
  "_id": "5fb5853f734231456ccb3b05",
  "username": "exampleUser"
}
```

### Adding an Exercise
```
POST /api/users/5fb5853f734231456ccb3b05/exercises
{
  "description": "Morning run",
  "duration": 30,
  "date": "2023-01-15"
}
```

Response:
```json
{
  "_id": "5fb5853f734231456ccb3b05",
  "username": "exampleUser",
  "description": "Morning run",
  "duration": 30,
  "date": "Mon Jan 15 2023"
}
```

### Getting Exercise Logs
```
GET /api/users/5fb5853f734231456ccb3b05/logs?from=2023-01-01&to=2023-01-31&limit=5
```

Response:
```json
{
  "_id": "5fb5853f734231456ccb3b05",
  "username": "exampleUser",
  "count": 1,
  "log": [
    {
      "description": "Morning run",
      "duration": 30,
      "date": "Mon Jan 15 2023"
    }
  ]
}
```

## FreeCodeCamp Project Requirements

This project fulfills the following user stories:

1. You can create a user by posting form data username to /api/users
2. The returned response includes username and _id
3. You can add an exercise to any user by posting form data description, duration, and optionally date to /api/users/:_id/exercises
4. If no date is supplied, the current date will be used
5. The response returned from POST /api/users/:_id/exercises includes the user's _id, username, description, duration, and date
6. You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user
7. A request to a user's log can include optional from, to, and limit parameters

## License

This project is part of the [FreeCodeCamp](http://www.freecodecamp.org) curriculum.

## ✍️ Author

Made with 💻 by [kurogamidesuu](https://github.com/kurogamidesuu)