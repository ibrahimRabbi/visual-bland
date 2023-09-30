import { FaTrash, FaEdit } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useOneDataGetQuery } from '../../redux/API/baseApi';
import { useContext } from 'react';
import { Context } from '../../Authentication/AuthContext';





const MyCourse = () => {
 const {user} = useContext(Context)
const {data=[],refetch} = useOneDataGetQuery(user?.email)

    const deleteHandler = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "do you want to delete this?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/data/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your class has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })


    }




    return (
        <div className="overflow-x-auto w-full my-11 ml-6 p-11">

            <table className="table w-full">

                <thead className='bg-slate-200'>
                    <tr className=''>
                        <th className='p-5'>number</th>
                        <th>class Name</th>
                        <th>FeedBack</th>
                        <th><span className='ml-16'>Action</span></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value, index) => {
                        return (
                            <tr key={value._id}>

                                <th>{index + 1}</th>
                                <th>{value.name}</th>
                                <th><BiMessageDetail className='text-2xl ml-6' /></th>
                                <th className='flex gap-3'>
                                    <button onClick={() => deleteHandler(value._id)} className='bg-red-600 p-2 rounded-lg text-slate-50 flex gap-2 items-center'><FaTrash /> Delete</button>
                                    <Link to={`/dashboard/updatecourse/${value._id}`} className='bg-purple-700 p-2 rounded-lg text-slate-50 flex gap-2 items-center '><FaEdit /> update</Link>
                                </th>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    );
};

export default MyCourse;