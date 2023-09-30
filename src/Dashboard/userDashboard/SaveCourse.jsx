import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Authentication/AuthContext';
import { BsBookmarkXFill } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { Roller } from 'react-spinners-css';
import { useNavigate } from 'react-router-dom';

const SaveCourse = () => {
    const {user} = useContext(Context)
     const [data,setData] = useState([])
    const navigate = useNavigate()
    const delteHandler = (id) => {
        fetch(`http://localhost:5000/savecourse/${id}`, {
            method:'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                if (res.deletedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Sign in successfull',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    refetch()
                }
        })
    }
    useEffect(() => {
        fetch(`http://localhost:5000/savecourse?email=${user?.email}`, {
            method: 'GET',
            headers:{authorization:localStorage.getItem('token')}
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                navigate('/signin')
                } else {
                    setData(res)
            }
        })
    },[])

    if (!user && data.length === 0) {
        return <Roller className='mt-48 block mx-auto' /> 
    }

    return (
        <div className='w-[90%]'>
            <div className="overflow-x-auto">
                <table className="table">
                   
                    <thead className='bg-slate-200'>
                        <tr>
                            <th>SR.NO</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Unsave</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((v,index) => {
                                return (
                                    <tr key={v._id}>
                                        <td>{index+1}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={v.img} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{v.name}</td>
                                        <td>{v.price}TK</td>
                                        <td> <button onClick={()=>delteHandler(v._id)} className='text-2xl btn bg-transparent text-sky-600'><BsBookmarkXFill/></button></td> 
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

export default SaveCourse;