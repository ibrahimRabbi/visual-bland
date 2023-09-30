import React, { useContext } from 'react';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { useLoaderData, useParams } from 'react-router-dom';
import { useIdDataQuery } from '../redux/API/baseApi';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../redux/slice/courseSaveSlice';
import { Context } from '../Authentication/AuthContext';

const SingleCourse = () => {
    const { id } = useParams()
    const { data = {} } = useIdDataQuery(id)
    const {user} = useContext(Context)
    const { price, iname, name, email,img, descrioption, iImage, thumbnail } = data
    const dispatch = useDispatch()
    const { obj } = useSelector((state) => state.courseWouldSave)
   const createObj = {name,price,img,email:user?.email}
    return (
        <section className='mt-11 mb-28 w-[90%] mx-auto'>
            <div className='flex gap-11 items-start'>
                <iframe height={380} width={550} src={thumbnail}></iframe>
                <div className='w-[46%]'>
                    <div>
                        <h1 className='text-2xl font-semibold'>{name}</h1>
                        <p className='text-sm text-gray-500 w-[87%]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae quod architecto perferendis fugit commodi animi.</p>
                        <div className='flex justify-between items-center mt-7'>
                            <p className='text-2xl font-semibold'>PRICE - {price}TK</p>
                            <button onClick={() => dispatch(update(createObj))} className='btn bg-transparent border-none'><BsFillBookmarkCheckFill className={`text-2xl text-sky-600 hover:text-sky-700`}/></button>
                        </div>
                    </div>

                    <div className='mt-10 flex gap-4'>
                        <div className="avatar">
                            <div className="w-14 rounded-full">
                                <img src={iImage} alt="" />
                            </div>
                        </div>
                        <div>
                            <p className='font-semibold'>{iname}</p>
                            <p className='text-sm'>Email : {email}</p>
                        </div>
                    </div>
                    <p className='mt-2 text-sm text-slate-800'>{descrioption}</p>
                    <div className='mt-6'>
                        <p className='font-semibold text-lg border-b-2 border-sky-500 w-[60%]'>Whats benifit you get in this course</p>
                        <ol className='list-disc ml-5 mt-2'>
                            <li>70+ pre-recorded class</li>
                            <li>Conceptual session</li>
                            <li>Live Session Support</li>
                            <li>Assignment system</li>
                            <li>Cirtificate Provide</li>
                        </ol>
                    </div>
                    <button className='btn bg-sky-500 mt-10 w-[76%] mx-auto block text-slate-100 hover:bg-sky-600'>Enroll Now</button>
                </div>
            </div>

        </section>
    );
};

export default SingleCourse;