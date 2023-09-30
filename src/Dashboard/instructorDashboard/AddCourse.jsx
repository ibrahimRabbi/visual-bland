import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../../Authentication/AuthContext";
import Title from "../../Ui/Title";

 

const Addcourse = () => {
    const { user } = useContext(Context)
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const navigate = useNavigate()

 
    const submit = (data) => {
        const { className, price, img, videoLink, descrioption } = data

        console.log(data)
        const fromData = new FormData()
        fromData.append('image', img[0])
             

        fetch(`https://api.imgbb.com/1/upload?key=980c5aa9b32d7a954c2c27ea3bb7f131`, {
            method: "POST",
            body: fromData
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    const obj = {
                        name:  className,
                        email: user?.email,
                        iname: user?.displayName,
                        iImage: user?.photoURL,
                        price: price,
                        rating : 4,
                        img: res.data.display_url,
                        thumbnail: videoLink,
                        descrioption : descrioption
                    }
                    fetch(' http://localhost:5000/data', {
                        method: "POST",
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(obj)
                    })

                        .then(res => res.json())
                        .then(res => {
                            if (res.insertedId) {
                                navigate('/dashboard/mycourse')
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'class has been added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })

    }
    return (
        <section className="w-[70%] bg-slate-200 rounded-lg shadow-lg mx-auto">
            <div className="mt-5">
                <Title title='Add Course' />
             </div>
            <form className="border px-16 py-6 flex flex-col gap-6" onSubmit={handleSubmit(submit)}>
                <div className="flex gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">your Name</span>
                        </label>
                        <input defaultValue={user?.displayName} className="border border-sky-600 rounded-2xl p-2" placeholder="Name" readOnly />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">email</span>
                        </label>
                        <input defaultValue={user?.email} className="border border-sky-600 rounded-2xl p-2" placeholder="email" readOnly />
                    </div>
                </div>

                <div className="flex gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Class name</span>
                        </label>
                        <input className="border border-sky-600 rounded-2xl p-2" placeholder="class name" {...register('className', { required: true })} />
                        {errors.className && <p className="text-red-500">className is required</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Class price</span>
                        </label>
                        <input type='number' className="border border-sky-600 rounded-2xl p-2" placeholder="price" {...register('price', { required: true })} />
                        {errors.price && <p className="text-red-500">price is required</p>}
                    </div>
                </div>

                <div className="flex gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Video iframe Link</span>
                        </label>
                        <input type='text' className="border border-sky-600 rounded-2xl p-2" placeholder=" provide must be youtube em Link" {...register('videoLink', { required: true })} />
                        {errors.videoLink && <p className="text-red-500">video link is requird</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">uploade class Image</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" {...register('img', { required: true })} />
                        {errors.img && <p className="text-red-500">Class Image is requird</p>}
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea {...register('descrioption', { required: true })} className="textarea textarea-bordered h-24" placeholder="type here"></textarea>
                     
                </div>

                <input className="btn bg-sky-500 text-slate-50" type="submit" />
            </form>
        </section>
    );
};

export default Addcourse;