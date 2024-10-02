import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from './Avator'
function UserSearchCard({user,onClose}) {
    return (
        <Link to={"/chat/"+user?._id} onClick={onClose} className='flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-primary rounded cursor-pointer'>
            <div>
                <Avatar
                    width={50}
                    height={50}
                    name={user?.name}
                    userId={user?._id}
                    imageUrl={user?.profile_pic}
                />
            </div>
            <div>
                <div className='font-semibold text-zinc-900 line-clamp-1'>
                    {user?.firstName+" "+user?.lastName}
                </div>
                <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
            </div>
        </Link>
      )
}

export default UserSearchCard
