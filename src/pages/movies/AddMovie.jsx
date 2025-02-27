import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Addmovies } from './movieSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
// import { AddmoviesForm } from './movieSlice';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  rating: yup.number().min(0).max(10).required('Rating is required'),
  releaseDate: yup.date().required('Release Date is required'),
  duration: yup.number().min(1).required('Duration is required'),
});

const AddmoviesForm = ({ onSubmit }) => {
  const { isLoading } = useSelector(state => state.moviesReducer);

  const navigate=useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
const dispatch =useDispatch();


  const submitForm = (data) => {
    dispatch(Addmovies(data))
    .unwrap()
    .then((res) => {
      // toast.success(res?.message || "Movie added successfully!");
      reset()
      navigate('/view_movies'); // Redirect to movies list (if needed)
    })
    .catch((err) => {
      console.error("Error adding movie:", err);
      toast.error(err?.message || "Something went wrong while adding the movie.");
    });
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      {isLoading && <Loader />}

      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-white text-3xl mb-6 text-center">Add Movie</h2>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          <div>
            <label className="text-white">Title</label>
            <input {...register('title')} className="w-full p-2 rounded bg-gray-700 text-white" />
            <p className="text-red-500 text-sm">{errors.title?.message}</p>
          </div>
          <div>
            <label className="text-white">Description</label>
            <textarea {...register('description')} className="w-full p-2 rounded bg-gray-700 text-white"></textarea>
            <p className="text-red-500 text-sm">{errors.description?.message}</p>
          </div>
          <div>
            <label className="text-white">Rating (0-10)</label>
            <input type="number" step="0.1" {...register('rating')} className="w-full p-2 rounded bg-gray-700 text-white" />
            <p className="text-red-500 text-sm">{errors.rating?.message}</p>
          </div>
          <div>
            <label className="text-white">Release Date</label>
            <input type="date" {...register('releaseDate')} className="w-full p-2 rounded bg-gray-700 text-white" />
            <p className="text-red-500 text-sm">{errors.releaseDate?.message}</p>
          </div>
          <div>
            <label className="text-white">Duration (minutes)</label>
            <input type="number" {...register('duration')} className="w-full p-2 rounded bg-gray-700 text-white" />
            <p className="text-red-500 text-sm">{errors.duration?.message}</p>
          </div>
          <button type="submit" className="w-full p-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddmoviesForm;
