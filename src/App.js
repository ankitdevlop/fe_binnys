import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Auth from './pages/Auth/Auth';
import ViewMovies from './pages/movies/ViewMovie';
import MoviesDetails from './pages/movies/MovieDetails';
import AddmoviesForm from './pages/movies/AddMovie';
import EditMovie from './pages/movies/EditMovie';
import TopBar from './pages/Topbar/TopBar';
import NotFound from './pages/NotFound/NotFound';
function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('token'); // Replace with proper auth check logic
  };
  
  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" />;
  };
  
  return (
    <div className="App">
            <div style={{ position: "sticky", top: "0" }}>
      {isAuthenticated() && (
        <div style={{ position: "sticky", top: "0" }}>
          <TopBar />
        </div>
      )}
      </div>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route 
          path="/view_movies" 
          element={
            <ProtectedRoute>

              <ViewMovies/>
            </ProtectedRoute>
           
          } 
        />
        <Route 
          path="/movie_info" 
          element={
            <ProtectedRoute>
              <MoviesDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add_movie" 
          element={
            <ProtectedRoute>
              <AddmoviesForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit_movie" 
          element={
            <ProtectedRoute>
              <EditMovie />
            </ProtectedRoute>
          } 
        /> 
      <Route path="*" element={<NotFound/>} />
      </Routes>
      <ToastContainer/>

    </div>
  );
}

export default App;
