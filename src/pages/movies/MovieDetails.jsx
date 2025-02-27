import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteEvent, deleteMovies, getEventById, getMoviesById } from './movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import { jwtDecode } from "jwt-decode";


function MoviesDetails() {
  const navigate = useNavigate();
  const { isLoading, onlymoviesDetails } = useSelector(state => state.moviesReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movie_id = searchParams.get("_id");
  const token = localStorage.getItem("token");
  let userRole = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role; // Assuming JWT has a 'role' field
  }

  const queryParams = `?_id=${movie_id}`;
  const fetchEvents = () => {

    dispatch(getMoviesById(queryParams)).unwrap()
      .then((res) => {
        // toast.success("success");
      })
      .catch((error) => {
        toast.success("fail")
      });
  }
  const handleDelete = (id) => {
    const queryParams = `?_id=${id}`
    dispatch(deleteMovies(queryParams)).unwrap()
      .then((res) => {
        navigate('/view_movies')
        // toast.success("success");
      })
      .catch((error) => {
        toast.success("fail")
      });
  }
const handleEdit =(id)=>{
  navigate(`/edit_movie?_id=${id}`,{state:{_id:id}})
}

  useEffect(() => {
    fetchEvents()
  }, [])
  return (
    <div>
      {isLoading && <Loader />}

      <section className="text-white bg-gray-900  body-font">
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden p-6">
        {/* Movie Title */}
        <h1 className="text-3xl font-bold text-indigo-400 mb-2">Title : {onlymoviesDetails?.title}</h1>
        
        {/* Movie Rating & Release Date */}
        <div className="flex items-center space-x-4 text-gray-400 text-sm mb-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.3 3.98a1 1 0 00.95.69h4.178c.97 0 1.372 1.24.588 1.81l-3.374 2.453a1 1 0 00-.364 1.118l1.3 3.98c.3.921-.755 1.688-1.54 1.118l-3.374-2.453a1 1 0 00-1.176 0l-3.374 2.453c-.784.57-1.838-.197-1.54-1.118l1.3-3.98a1 1 0 00-.364-1.118L2.032 9.407c-.784-.57-.382-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.3-3.98z" />
            </svg>
            <span> Rating {onlymoviesDetails?.rating} / 10</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-indigo-400 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 4h-3V2h-2v2H9V2H7v2H4a2 2 0 00-2 2v14a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
              <path d="M16 11h4M4 11h4m6 4h.01m-2.01 0h-.01m-2.01 0h-.01m-2.01 0h-.01"></path>
            </svg>
            <span> Release Date {new Date(onlymoviesDetails?.releaseDate).toDateString()}</span>
          </div>
        </div>

        {/* Movie Description */}
        <p className="text-gray-300 mb-4">description : {onlymoviesDetails?.description}</p>

        {/* Movie Duration */}
        <div className="flex items-center text-gray-400">
          <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 8V12l3 3"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          <span>duration {onlymoviesDetails?.duration} min</span>
        </div>
      </div>
    </div>

      {/* Admin Actions */}
      {userRole === "admin" && (
        <div className="flex justify-center space-x-4 mt-10">
          <button
            className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
            onClick={() => handleDelete(onlymoviesDetails?._id)}
          >
            Delete Event
          </button>
          <button
            className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg"
            onClick={() => handleEdit(onlymoviesDetails?._id)}
          >
            Edit Event
          </button>
        </div>
      )}

      {/* Back Button */}
      <div className="flex justify-center mt-6">
        <button
          className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          onClick={() => navigate("/view_movies")}
        >
          Back
        </button>
      </div>
    </section>
    </div>
  );
}

export default MoviesDetails;
