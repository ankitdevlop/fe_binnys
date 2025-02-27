import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Login, signup } from './loginSlice';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const { isLoading } = useSelector(state => state.loginReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Validation Schema
    const schema = yup.object({
        username: yup.string().required('username is required'),
        password: yup.string().required('Password is required'),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const handleAuth = (data) => {
        if (isLogin) {
            dispatch(Login(data))
                .unwrap()
                .then(res => {
                    localStorage.setItem('token', res.token);
                    navigate('/view_movies');
                    toast.success('Login successful');
                    reset();
                })
                .catch(() => toast.error('Login failed'));
        } else {
            dispatch(signup(data))
                .unwrap()
                .then(res => {
                    localStorage.setItem('token', res.token);
                    navigate('/view_movies');
                    toast.success('Signup successful');
                    reset();
                })
                .catch(() => toast.error('Signup failed'));
        }
    };

    return (
        <>
            {isLoading && <Loader />}
            <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col justify-center items-center">
                <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
                    <div className="flex flex-col items-center">
                        <img className="w-16 h-8 mb-4" src={logo} alt="logo" />
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                            {isLogin ? 'Sign in to your account' : 'Create an account'}
                        </h1>
                    </div>
                    <form className="space-y-4 mt-6" onSubmit={handleSubmit(handleAuth)}>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white">username</label>
                            <input
                                type="text"
                                {...register('username')}
                                className="w-full p-2.5 border rounded-lg bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="name@example.com"
                            />
                            {errors.username && <div className="text-red-700 text-sm">{errors.username.message}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                type="password"
                                {...register('password')}
                                className="w-full p-2.5 border rounded-lg bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="••••••••"
                            />
                            {errors.password && <div className="text-red-700 text-sm">{errors.password.message}</div>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-950 text-white py-2.5 rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-300"
                        >
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>
                    <p className="text-sm text-gray-500 mt-4">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <span
                            onClick={() => { setIsLogin(!isLogin); reset(); }}
                            className="text-purple-600 hover:underline cursor-pointer"
                        >
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </span>
                    </p>
                </div>
            </section>
        </>
    );
}

export default Auth;
