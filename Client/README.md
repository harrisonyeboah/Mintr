# Mintr Frontend

A modern React application with a sleek black and white theme for user authentication.

## Features

- **Login Page**: Clean and intuitive login form
- **Registration Page**: User registration with form validation
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Black and white theme with smooth animations
- **Form Validation**: Client-side validation for better user experience

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the client directory:
   ```bash
   cd Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components (Login, Register)
├── styles/             # CSS files
├── utils/              # Utility functions
├── assets/             # Images, icons, etc.
├── App.js              # Main app component
└── index.js            # App entry point
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Styling

The application uses a custom black and white theme with:
- Dark backgrounds (#000000, #1a1a1a)
- White text and accents (#ffffff)
- Subtle gradients and shadows
- Smooth transitions and hover effects

## Next Steps

When you're ready to implement the backend:
1. The forms are set up to handle form submission
2. Add API calls to your backend endpoints
3. Implement proper error handling and success states
4. Add loading states during API calls

## Technologies Used

- React 18
- React Router DOM
- CSS3 with custom properties
- Modern JavaScript (ES6+)

