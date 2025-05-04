# Dashboard Application

A modern, multilingual dashboard application with secure authentication and user management system.

## Features

- 🔐 Secure authentication system
- 🌐 Multilingual support (English and Georgian)
- 📱 Responsive and modern UI design
- 🚀 Real-time resident verification
- 🔒 Password encryption
- 🎨 Beautiful and intuitive user interface
- 📊 Dashboard with user information

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: HTML5, CSS3, JavaScript
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Templating**: EJS
- **Styling**: Custom CSS with modern design principles

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [path-to-folder]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the application:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Database models
├── public/         # Static assets
│   ├── css/       # Stylesheets
│   ├── js/        # Client-side scripts
│   └── flags/     # Language flag images
├── routes/         # Route definitions
├── utils/          # Utility functions
└── views/          # EJS templates
```

## API Endpoints

- `POST /register` - User registration
- `POST /login` - User authentication
- `POST /api/check-resident` - Resident verification
- `GET /dashboard` - User dashboard
- `POST /logout` - User logout

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Secure session management
- Input validation
- Error handling
- XSS protection

## License

This project is licensed under the MIT License - see the LICENSE file for details.
