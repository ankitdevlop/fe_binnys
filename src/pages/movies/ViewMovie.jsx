import React, { useEffect, useState } from "react";
// import UpCommingEvents from "./UpCommingEvents";
// import PastEvents from "./PastEvents";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "./movieSlice";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

function ViewMovies() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, movies } = useSelector((state) => state.moviesReducer);

    // State for filters & pagination
    const [category, setCategory] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [search, setSearch] = useState(""); // Search by title
    const [sortBy, setSortBy] = useState("title"); // Sorting field
    const [order, setOrder] = useState("asc"); // Sort order
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    // Function to fetch movies with filters
    const fetchMovies = () => {
        let queryParams = new URLSearchParams();

        if (search) queryParams.append("search", search);
        if (category) queryParams.append("category", category);
        if (releaseDate) queryParams.append("releaseDate", releaseDate);
        if (sortBy) queryParams.append("sortBy", sortBy);
        if (order) queryParams.append("order", order);
        queryParams.append("page", page);
        queryParams.append("limit", limit);

        const apiUrl = `?${queryParams.toString()}`;

        dispatch(getAllMovies(apiUrl))
            .unwrap()
            .then(() => {
                // toast.success("Movies fetched successfully");
            })
            .catch(() => {
                toast.error("Failed to fetch movies");
            });
    };
    useEffect(() => {
        fetchMovies();
    }, [page, sortBy, order]);
    
    const handleRouteChange=(id)=>{
        navigate(`/movie_info?_id=${id}`,{state:{_id:id}})
    }

    return (
        <div className="text-center bg-black py-24">
            {isLoading && <Loader />}

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
                <h3 className="text-white font-bold text-lg">Add New Movie Data</h3>
                <button
                    onClick={() => navigate("/add_movie")}
                    className="group cursor-pointer outline-none hover:rotate-90 duration-300 mb-8"
                    title="Add New"
                >
                    <svg
                        className="stroke-teal-500 fill-none group-hover:fill-green-100 group-active:stroke-teal-200 group-active:fill-teal-100 group-active:duration-0 duration-300"
                        viewBox="0 0 24 24"
                        height="50px"
                        width="50px"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeWidth="1.5" d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"></path>
                        <path strokeWidth="1.5" d="M8 12H16"></path>
                        <path strokeWidth="1.5" d="M12 16V8"></path>
                    </svg>
                </button>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                />

                

                {/* End Date */}
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                />

                {/* Sorting */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                >
                    <option value="title">Sort by Title</option>
                    <option value="rating">Sort by Rating</option>
                </select>

                {/* Order */}
                <select
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>

                {/* Filter Button */}
                <button
                    onClick={fetchMovies}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                >
                    Filter Events
                </button>
            </div>
            <section class="text-white body-font">
  <div class="container px-5 py-24 mx-auto">
  <div className="flex flex-wrap -m-4">
  {movies?.movies?.map((item) => (
    <div key={item._id} className="p-4 lg:w-1/3">
      <div className="h-full bg-gray-700 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
        <h2 className="tracking-widest text-xs title-font font-medium text-white mb-1">{item.title}</h2>
        <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">{item.title}</h1>
        <p className="leading-relaxed mb-3">{item.description}</p>
        <a className="text-indigo-500 inline-flex items-center" onClick={()=>handleRouteChange(item._id)}>Learn More
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </a>
        <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
            <span class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
              <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg> rating {item.rating}
            </span>
            <span class="text-gray-400 inline-flex items-center leading-none text-sm">
              <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg> {item.duration}6
            </span>
            <span class="text-gray-400 inline-flex items-center leading-none text-sm">
              <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg> {item.releaseDate}6
            </span>
          </div>
      </div>
    </div>
  ))}
</div>

  </div>
</section>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 mt-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
                >
                    Previous
                </button>
                <span className="text-white">Page {page}</span>
                <button
                    onClick={() => setPage(page + 1)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
                >
                    Next
                </button>
            </div>

        </div>
    );
}

export default ViewMovies;
