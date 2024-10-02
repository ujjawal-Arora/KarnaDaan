import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import Avator from '../Avator';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../../redux/Slice/slice';


function Sidebar_per() {
          const dispatch = useDispatch();
          const navigate=useNavigate();
    const handleLogout=()=>{
        dispatch(authActions.logout()); // Perform logout
        localStorage.removeItem('user'); // Clear local storage
        Cookies.remove('token');
        navigate('/');
    }
    const user=useSelector(state=>state.auth);
    console.log("userAt SideBar",user);
  return (
    <div className="p-3 w-[35vw] text-black border bg-zinc-100 border-zinc-300">
    {/* Back arrow at the top of the sidebar */}
    <button className="text-zinc-800 mb-5" onClick={() => navigate('/')}>
      <IoIosArrowBack size={30} />
    </button>

    <div className="mt-5 flex justify-center">
      <div className="rounded-full overflow-hidden border-zinc-300">
        <Avator name={user.name} width={150} height={150} imageUrl={user.profile_pic} />
      </div>
    </div>
    <h1 className='flex justify-center text-2xl font-bold underline'>{user.name}</h1>
    <div className='mt-20 flex flex-col items-center space-y-4'>
    <Link to="/your-donations">
        <button className='text-white bg-zinc-800 hover:bg-zinc-700 w-40 py-2 rounded-lg border border-zinc-300'>
          YOUR Donations
        </button>
      </Link>

      <Link to="/your-requests">
        <button className='text-white bg-zinc-800 hover:bg-zinc-700 w-40 py-2 rounded-lg border border-zinc-300'>
          YOUR REQUEST
        </button>
      </Link>
      <Link to="/wishlist">
        <button className='text-white bg-zinc-800 hover:bg-zinc-700 w-40 py-2 rounded-lg border border-zinc-300'>
          YOUR WISHLIST
        </button>
      </Link>
      <Link to="/funds">
        <button className='text-white bg-zinc-800 hover:bg-zinc-700 w-40 py-2 rounded-lg border border-zinc-300'>
          YOUR FUNDS
        </button>
      </Link>
      <hr className="my-4 w-40 border-gray-300" />
      <button
        className='bg-zinc-800 text-white hover:bg-orange-300 w-40 border border-zinc-300 rounded-lg py-2'
        onClick={handleLogout}
      >
        LOGOUT
      </button>
    </div>
  </div>

  )
}

export default Sidebar_per
