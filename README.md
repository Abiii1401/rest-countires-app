# REST Countries App

A React application that displays information about countries using the REST Countries API.

## Features

- View all countries with their basic information
- Search countries by name
- Filter countries by region
- View detailed information about each country
- Responsive design with dark mode support
- Mobile-friendly interface

## API Endpoints Used

- `GET /all` - Fetch all countries
- `GET /name/{name}` - Search by country name
- `GET /region/{region}` - Filter by region
- `GET /alpha/{code}` - Get country details by code

## Tech Stack

- React (Functional Components)
- JavaScript
- Tailwind CSS
- React Router DOM
- Axios

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```
src/
├── components/
│   ├── CountryCard.jsx            # Shows basic info of a country
│   ├── SearchBar.jsx              # Search input for country name
│   └── FilterDropdown.jsx         # Dropdown to filter by region
├── pages/
│   └── CountryDetails.jsx         # Detailed page for a single country
├── services/
│   └── api.js                     # API functions for REST Countries
├── App.jsx
└── index.js
```

## Testing

The project uses Jest and React Testing Library for testing. To run the tests:

```bash
npm test
```

## Deployment

The application can be deployed on Vercel or Netlify. The deployment link will be added here once available.
