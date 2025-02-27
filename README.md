# MERN Stack Movie Application: Frontend

## Live Demo
[Binny's Jewellery Movie App](https://binnysjewelleryfe.netlify.app/)

## Objective
Develop a frontend application for a movie web platform with user and admin functionalities, integrating authentication, authorization, and efficient data presentation.

## Features

### User Features
- View movie details fetched from IMDb's Top 250 Movies.
  - Reference: [IMDb Top 250](https://www.imdb.com/chart/top?ref_=nv_mv_250)
- Search movies by name or description.
- Sort movies by name, rating, release date, and duration.

### Admin Features
- Add new movie details.
- Edit or delete existing movies.

## Tech Stack

### Frontend
- **Framework**: React.js
- **Styling**: Material-UI (MUI) for responsive UI
- **State Management**: Context API / Redux
- **Routing**: React Router DOM
- **Authentication**: JWT-based login & role-based access control

### Pages
- **Home Page**: Displays all movies with pagination.
- **Search Page**: Allows searching/filtering movies by name or description.
- **Add Movie Page** (Admin only): Form for adding new movies.
- **Edit/Delete Movie Page** (Admin only): Admin functionalities for modifying movie details.

## Deployment
- **Frontend Hosting**: Vercel / Netlify

## Installation & Setup
### Prerequisites
- Node.js

### Frontend Setup
```sh
cd frontend
npm install
npm start
```

## Evaluation Criteria
1. **Authentication & Authorization**: Secure user login and role-based access control.
2. **Frontend Design**: Responsive UI using Material-UI.
3. **Code Quality**: Well-documented code with version control.

## Version Control
- Public GitHub repository with proper commits and documentation.

## License
This project is licensed under the MIT License.

