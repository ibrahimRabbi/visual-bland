import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { BsFillBookmarkCheckFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../redux/slice/courseSaveSlice';



const CourseCard = ({ data }) => {
    const { img, rating, name, _id } = data
    
    // const { obj } = useSelector((state) => state.courseWouldSave)
    const dispatch = useDispatch()
    
    return (
        <Link to={`${_id}`}>
            <div className="card card-compact bg-base-100 shadow-xl hover:scale-105 duration-100 border">
                <figure><img  className='w-full h-[200px]' src={img} alt="banner"/></figure>
                <div className="card-body">
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions flex justify-between items-center mt-8">
                        <Rating style={{ maxWidth: 160 }} value={rating}/>
                        <button onClick={()=>dispatch(update(data))} className='hover:text-sky-400'><BsFillBookmarkCheckFill className='text-2xl text-sky-600 hover:text-sky-700'/></button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;