import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMoviesById, updateMovies } from "./movieSlice"; // Import actions
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

const schema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    rating: yup
        .number()
        .min(0, "Rating must be at least 0")
        .max(10, "Rating cannot exceed 10")
        .required("Rating is required"),
    releaseDate: yup.date().required("Release date is required"),
    duration: yup.number().positive("Duration must be a positive number").required("Duration is required"),
});

function EditMovie() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const _id = searchParams.get("_id");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { onlymoviesDetails, isLoading } = useSelector((state) => state.moviesReducer); // Fetch movie data

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    console.log(_id)
    useEffect(() => {
        const queryParams=`?_id=${_id}`
        dispatch(getMoviesById(queryParams))
            .unwrap()
            .then((res) => {
                if (res) {
                    // Populate form with fetched movie data
                    setValue("title", res.title);
                    setValue("description", res.description);
                    setValue("rating", res.rating);
                    setValue("releaseDate", res.releaseDate.split("T")[0]); // Format date
                    setValue("duration", res.duration);
                }
            })
            .catch((err) => {
                toast.error("Failed to load movie details.");
            });
    }, [dispatch, _id, setValue]);

    const handleEditMovie = async (data) => {
        try {
            const queryParams = `?_id=${_id}`;
            await dispatch(updateMovies({ requestData: data, queryParams })).unwrap();
            // toast.success("Movie updated successfully!");
            navigate("/view_movies"); // Redirect after update
        } catch (error) {
            toast.error(error?.message || "Something went wrong while updating.");
        }
    };
    

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            {isLoading && <Loader />}
            <div className="w-full max-w-3xl bg-gray-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-white text-4xl text-center mb-6">Edit Movie</h2>

                <form onSubmit={handleSubmit(handleEditMovie)} className="grid grid-cols-1 gap-6">
                    {/* Title */}
                    <div>
                        <label className="text-white">Title</label>
                        <input
                            type="text"
                            {...register("title")}
                            className="w-full bg-gray-700 text-white rounded-lg p-2.5"
                        />
                        {errors.title && <p className="text-red-700">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-white">Description</label>
                        <textarea
                            rows="3"
                            {...register("description")}
                            className="w-full bg-gray-700 text-white rounded-lg p-2.5"
                        ></textarea>
                        {errors.description && <p className="text-red-700">{errors.description.message}</p>}
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="text-white">Rating (0-10)</label>
                        <input
                            type="number"
                            step="0.1"
                            {...register("rating")}
                            className="w-full bg-gray-700 text-white rounded-lg p-2.5"
                        />
                        {errors.rating && <p className="text-red-700">{errors.rating.message}</p>}
                    </div>

                    {/* Release Date */}
                    <div>
                        <label className="text-white">Release Date</label>
                        <input
                            type="date"
                            {...register("releaseDate")}
                            className="w-full bg-gray-700 text-white rounded-lg p-2.5"
                        />
                        {errors.releaseDate && <p className="text-red-700">{errors.releaseDate.message}</p>}
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="text-white">Duration (minutes)</label>
                        <input
                            type="number"
                            {...register("duration")}
                            className="w-full bg-gray-700 text-white rounded-lg p-2.5"
                        />
                        {errors.duration && <p className="text-red-700">{errors.duration.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white font-medium text-lg py-3 px-4 rounded-lg hover:bg-indigo-600"
                    >
                        Update Movie
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditMovie;
