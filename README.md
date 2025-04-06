# GameHub

GameHub is a React-based web application that allows users to browse, search, and manage a collection of video games using the RAWG API. Built with TypeScript, Redux, React-Bootstrap, and Clerk for authentication, it provides a polished user experience with features like filtering, favoriting games, and responsive design.

## Features

- **Browse Games**: View a paginated list of games fetched from the RAWG API.
- **Search**: Real-time search functionality to find games by name.
- **Filters**: Filter games by category (e.g., RPG, Action), release year, popularity (rating), and tags.
- **Authentication**: Sign in/out with Clerk to access game browsing and library features.
- **Library**: Add/remove games to a personal library (stored in Redux).
- **Game Details**: View detailed game information, including descriptions, ratings, screenshots, and system requirements.
- **Responsive Design**: Mobile-friendly layout with a collapsible sidebar (hamburger menu) and back navigation.
- **Loading & Error States**: User-friendly spinners and messages for API interactions.
- **Polish**: Smooth animations, Bootstrap Icons, and enhanced empty states.

## Tech Stack

- **Frontend**: React, TypeScript, React-Bootstrap
- **State Management**: Redux Toolkit
- **Authentication**: Clerk
- **API**: RAWG Video Games Database API
- **Styling**: Bootstrap, custom CSS
- **Routing**: React Router
- **Icons**: Bootstrap Icons (via CDN)

## Prerequisites

- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **RAWG API Key**: Obtain from [RAWG.io](https://rawg.io/apidocs)
- **Clerk Account**: Set up at [Clerk.dev](https://clerk.dev/)

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd game-hub

2. **Install Dependencies**:
    npm install

3. **Configure Environment Variables**:
    -Create a .env file in the root directory.
    -Add your RAWG API key and Clerk keys:
    REACT_APP_RAWG_API_KEY=your_rawg_api_key
    REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

4. **Add Bootstrap Icons**:
    -Ensure public/index.html includes:
    <link rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
    />

5. **Run the App**:
    - npm start

6. **Build for Production**:
    - npm run build

7. **Project Structure**:

    game-hub/
├── public/
│   └── index.html        # HTML template with Bootstrap Icons CDN
├── src/
│   ├── components/
│   │   ├── Header.tsx    # Navbar with search and hamburger toggle
│   │   └── Sidebar.tsx   # Filter controls
│   ├── pages/
│   │   ├── Home.tsx      # Game list with pagination
│   │   ├── Library.tsx   # User’s favorite games
│   │   └── GameDetail.tsx # Game details with back button
│   ├── redux/
│   │   └── slices/       # Redux Toolkit slices (favorites)
│   ├── services/
│   │   └── api.ts        # RAWG API fetch functions
│   ├── styles/
│   │   └── styles.css    # Custom CSS
│   └── App.tsx           # Main app with routing and sidebar
├── .env                  # Environment variables (not committed)
├── package.json          # Dependencies and scripts
└── README.md             # This file

### Usage

- **Sign In**: Use Clerk to authenticate (required to view games).
- **Browse**: Explore games on the home page, use filters or search.
- **Add to Library**: Click "Add to Library" on a game card.
- **View Details**: Click a game name to see more info, use the back button to return.
- **Mobile**: On small screens, click the hamburger icon to toggle the filter sidebar.

### Notes

- **TypeScript Compatibility**: Uses typescript@5.8.3, compatible with react-scripts@5.0.1 by avoiding conflicting peer dependencies.
- **Limitations**: Pricing info isn’t available via RAWG API.
- **Polish**: Includes loading spinners, error messages, and hover effects for a refined UX.

### Troubleshooting

- **API Errors**: Verify REACT_APP_RAWG_API_KEY in .env.
- **Sidebar Not Toggling**: Ensure Bootstrap Icons CDN is loaded and toggleSidebar logs in console.
- **Build Issues**: Check TypeScript version compatibility or run npm install again.

### Submission Context

-This project was developed as part of a recruitment test, showcasing skills in React, TypeScript, state management, API integration, authentication, and responsive design.

### Customization
- **Repository URL**: Replace `<repository-url>` with your actual repo link if applicable (e.g., GitHub).
- **Screenshots**: Add images under a `## Screenshots` section if desired (e.g., `![Home Page](screenshots/home.png)`).
- **Personal Touch**: Add your name or contact info if submitting directly.

### How to Add It
1. Create `README.md` in `C:\Users\A\Desktop\MediaAmp-Game\game-hub`.
2. Copy-paste the content above.
3. Save and commit if using Git:
   ```bash
   git add README.md
   git commit -m "Add README file"