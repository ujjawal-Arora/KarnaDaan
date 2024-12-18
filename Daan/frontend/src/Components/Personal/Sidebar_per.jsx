import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import Avator from '../Avator';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../../redux/Slice/slice';



function Sidebar_per() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    Cookies.remove('token');
    navigate('/home');
  };
  const user = useSelector((state) => state.auth);

  return (
    <div className="p-5 w-[25vw] text-white bg-zinc-100 shadow-lg">
      <button className="text-orange-500 mb-5" onClick={() => navigate('/home')}>
        <IoIosArrowBack size={30} />
      </button>

      <div className="mt-5 flex flex-col items-center">
        <div className="rounded-full overflow-hidden border-4 ">
          <Avator name={user.name} width={120} height={120} imageUrl={user.profile_pic} />
        </div>
        <h1 className="mt-3 text-4xl font-bold text-orange-900 underline ">{user.name}</h1>
      </div>

      <div className="mt-10 flex flex-col items-center space-y-4">
        <Link to="/your-donations">
          <button className="w-40 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-700 shadow-md">
            Your Donations
          </button>
        </Link>
        <Link to="/your-posts">
          <button className="w-40 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-700 shadow-md">
            Your Posts
          </button>
        </Link>
        {/* <Link to="/your-requests"> */}
        <Link to="/your-requests">
          <button className="w-40 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-700 shadow-md">
            Your Requests
          </button>
        </Link>  
              <Link to="/wishlist">
          <button className="w-40 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-700 shadow-md">
            Your Wishlist
          </button>
        </Link>
        <hr className="my-4 w-40 border-orange-500" />
        <button
          className="w-40 py-2 rounded-lg bg-zinc-900 shadow-2xl hover:bg-zinc-700 border"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}

export default Sidebar_per;
