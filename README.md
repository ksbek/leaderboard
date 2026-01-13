# Leaderboard App

A standalone React application displaying a leaderboard with user rankings, recording data, sortable columns, and pagination.

## Features

- **🏆 Leaderboard Rankings**: Display users ranked by their performance with medals for top 3
- **📊 Sortable Columns**: Click any column header to sort in ascending/descending order
- **📄 Pagination**: Navigate through large datasets efficiently
- **📱 Responsive Design**: Built with Tailwind CSS for mobile-friendly layouts
- **⚡ State Management**: Redux Toolkit for managing application state
- **🔒 TypeScript**: Full type safety throughout the application
- **🎨 Visual Indicators**: Sort arrows, rank colors, and medals for top performers

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
results-app/
├── src/
│   ├── components/
│   │   ├── Results.tsx      # Main results component with table
│   │   └── Table.tsx         # Reusable table component
│   ├── store/
│   │   ├── store.ts          # Redux store configuration
│   │   ├── hooks.ts          # Typed Redux hooks
│   │   └── resultsSlice.ts   # Results state management
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Technologies Used

- **React 18**: UI library
- **TypeScript**: Type safety
- **Redux Toolkit**: State management
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Paginate**: Pagination component
- **Axios**: HTTP client

## Configuration

### API Endpoint

The API endpoint is configured in `src/store/resultsSlice.ts`. Update the `API_URI` constant to point to your backend:

```typescript
const API_URI = 'https://your-api-endpoint.com'
```

### Mock Data

If the API call fails, the application will display mock data for demonstration purposes. This ensures the UI is always visible during development.

## Customization

### Styling

The app uses Tailwind CSS. Custom colors are defined in `tailwind.config.js`:

- `reflex-dark-card`: Card background color
- `reflex-border-light`: Border color
- `reflex-teal`: Primary accent color
- `reflex-button-text`: Button text color

### Filters

Update the filter object in `src/App.tsx` to customize the default query parameters:

```typescript
const [filter] = useState({
  recordingType: '',
  gender: '',
  ethnicity: '',
  maxAmount: 100000000,
  minAmount: 0,
  minAge: 0,
  maxAge: 200,
  page: 0,
  perPage: 10
})
```

## License

MIT

