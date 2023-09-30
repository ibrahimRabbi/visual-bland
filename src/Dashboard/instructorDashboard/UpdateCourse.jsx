 
import { useState } from "react";
import { useLoaderData, useNavigate, } from "react-router-dom";
import Swal from "sweetalert2";



const UpdateCourse = () => { 
    const data = useLoaderData()
    const [image, setImage] = useState('')
     const  navigate = useNavigate()
 
    const handleSubmit = (e) => {
        e.preventDefault()
        const className = e.target.name.value
        const classPrice = e.target.price.value
        const videoLink = e.target.link.value
        

        if (e.target.img?.files[0]) {
            const fromData = new FormData()
            fromData.append('image', e.target.img.files[0])

            fetch(`https://api.imgbb.com/1/upload?key=980c5aa9b32d7a954c2c27ea3bb7f131`, {
                method: "POST",
                body: fromData
            })
                .then(res => res.json())
                .then(res => {
                    setImage(res.data?.display_url)
                })

        }

        fetch((` http://localhost:5000/data/${data._id}`), {
            method: "PATCH",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ className, classPrice, videoLink, image })
        })
            .then(res => res.json())
            .then(res => {
                if (res.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'update successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/dashboard/mycourse')
                }
            })
    }
    return (
        <section className="w-[70%] mx-auto">
            <form className="border p-16 flex flex-col gap-6" onSubmit={handleSubmit}>

                <div className="flex gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Class name</span>
                        </label>
                        <input name="name" defaultValue={data?.name} className="border border-sky-500 p-2" placeholder="class name" />

                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Class price</span>
                        </label>
                        <input name="price" defaultValue={data?.price} type='number' className="border border-sky-500 p-2" placeholder="price" />

                    </div>
                </div>

                <div className="flex gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">video Link</span>
                        </label>
                        <input name="link" type='text' defaultValue={data?.thumbnail} className="border border-sky-500 p-2" placeholder="type number" />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">update class Image</span>
                        </label>
                        <input name="img" type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                </div>

                <input className="btn bg-sky-500 " type="submit" />
            </form>
        </section>
    );
};

export default UpdateCourse;