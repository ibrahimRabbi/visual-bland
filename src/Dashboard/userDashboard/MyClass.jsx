import React, { useContext } from 'react';
import { useEnrolledDataQuery } from '../../redux/API/baseApi';
import { Context } from '../../Authentication/AuthContext';

const MyClass = () => {
    const {user} = useContext(Context)
    const { data = [] } = useEnrolledDataQuery(user?.email)
    
    return (
        <div className='w-[90%]'>
            <div className="overflow-x-auto">
                <table className="table">

                    <thead className='bg-slate-200'>
                        <tr>
                            <th>SR.NO</th>
                            <th>Image</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((v, index) => {
                                return (
                                    <tr key={v._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={v.img} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{v.name}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyClass;