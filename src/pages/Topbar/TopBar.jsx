import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserInfo } from '../Auth/loginSlice';

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user details from Redux
  const { isLoading, userInfo } = useSelector(state => state.loginReducer);
useEffect(()=>{
    dispatch(getUserInfo()).unwrap()
          .then((res) => {
            // toast.success("success");
          })
          .catch((error) => {
            toast.success("fail")
          })
},[])
  const handleLogout = () => {
    localStorage.setItem("token", '')
    navigate('/')
  };

  return (
    <div className="bg-gray-900 text-white py-4 px-6 shadow-lg fixed top-0 left-0 w-full flex justify-between items-center z-50">
      {/* Logo or App Name */}
      <div className="text-xl font-bold">🎬 Movie App</div>

      {/* User Info */}
      {userInfo ? (
        <div className="flex items-center gap-4">
          <p className="text-lg">
            <strong>{userInfo.username}</strong> <span className="text-gray-400">({userInfo.role})</span>
          </p>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default TopBar;
