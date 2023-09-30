import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
 import { Context } from "../Authentication/AuthContext";
import SigninProvider from "./SigninProvider";
import { Roller } from "react-spinners-css";





const SignUp = () => {

    const { signup, profile, loading } = useContext(Context)
    const { handleSubmit, register, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [load, setLoad] = useState(false)


    const submit = (data) => {
console.log(data)
        const { name, email, number, image, password, confirm } = data
        const formData = new FormData()
        formData.append('image', image[0])


        if (password !== confirm) {
            setError('confirm password doesnt match')
        } else {
            setError('')
            setLoad(true)
            const userObj = { email, password, name, number }
            fetch(`https://api.imgbb.com/1/upload?key=980c5aa9b32d7a954c2c27ea3bb7f131`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(res => {
                    if (res.data?.url) {
                        const img = res.data.url
                        signup(email, password)
                            .then(res => {
                                setLoad(true)
                                profile(res.user, name, img, number)
                                fetch('http://localhost:5000/user', {
                                    method: "POST",
                                    headers: { 'content-type': 'application/json' },
                                    body: JSON.stringify(userObj)
                                })
                                    .then(res => res.json())
                                    .then(res => {
                                        setLoad(false)
                                        if (res.insertedId) {
                                            Swal.fire({
                                                position: 'center',
                                                icon: 'success',
                                                title: 'Sign up Successfull',
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                            navigate('/')
                                        }
                                    })

                            })
                            .catch(error => {
                                setLoad(false)
                                if (error.message == "Firebase: Error (auth/email-already-in-use).") {
                                    setError('this email already have an account')
                                }
                            })
                    }
                })

        }
    }

    if (load) {
        return <Roller className="mt-48 block mx-auto" />
    }


    return (
        <section>


            <div className="my-10 mx-auto w-1/2">
                <div className="w-[70%] mx-auto text-sky-600">
                    <h1 className="text-4xl font-semibold text-center">Create a new account</h1>
                    <hr className="mt-3" />
                </div>
                <form className="space-y-5 mt-7" onSubmit={handleSubmit(submit)}>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text">Enter your full name*</span></label>
                            <input
                                className="border border-sky-500 rounded-2xl p-2" placeholder='name'
                                {...register('name', { required: true })} />
                            {errors.name && <p className="text-red-500">name is requird</p>}
                        </div>

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text">Enter Email*</span></label>
                            <input type="email"
                                className="border border-sky-500 rounded-2xl p-2" placeholder='email'
                                {...register('email', { required: true })} />
                            {errors.email && <p className="text-red-500">email is requird</p>}
                        </div>



                        <div className="form-control w-full">
                            <label className="label"><span className="label-text">Your Phone number*</span></label>
                            <input
                                className="border border-sky-500 rounded-2xl p-2" type="number" placeholder='number'
                                {...register('number', { required: true, minLength: 11, maxLength: 11 })} />
                            {errors.number?.type === 'required' && <p className="text-red-500">number is requird</p>}
                            {errors.number?.type === 'minLength' && <p className="text-red-500">input a valid mobail number</p>}
                            {errors.number?.type === 'maxLength' && <p className="text-red-500">input a valid mobail number</p>}
                        </div>

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text">your Image*</span></label>
                            <input type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" {...register('image', { required: true })}
                            />
                            {errors.image && <p className="text-red-500">your image is requird</p>}
                        </div>



                        <div className="form-control w-full">
                            <label className="label"><span className="label-text">type new password*</span></label>
                            <input
                                className="border border-sky-500 rounded-2xl p-2" placeholder='password'
                                {...register('password', {
                                    required: true,
                                    pattern: /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])/,
                                    minLength: 6
                                })} />
                            {errors.password?.type === 'required' && <p className="text-red-500">password is requird</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-500">password minimum 6 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-500">password must have a uppercase and number</p>}
                        </div>

                        <div className="form-control w-full">
                            <label className="label"><span className="label-text">confirm password*</span></label>
                            <input
                                className="border border-sky-500 rounded-2xl p-2" placeholder='confirm password'
                                {...register('confirm', { required: true })} />
                            {errors.confirm && <p className="text-red-500">confirm password is requird</p>}
                        </div>
                    </div>

                    <p className="text-red-600 pt-2">{error}</p>
                    <div>
                        <label className=" flex gap-2 text-gray-700 font-semibold" htmlFor="checkbox">
                            <span>Would you like to create Mentor account?</span>
                            <input {...register('checkbox')}  type="checkbox" name="hello" id="checkbox" />
                        </label>
                     </div>
                    <button className="bg-sky-500 hover:bg-sky-600 font-semibold p-2 w-full rounded-lg" type="submit">Sign up</button>

                </form>

                <p className="font-semibold text-sm text-center mt-7">Already Have an Account? <Link to='/signin' className="text-sky-500 font-bold">Sign In</Link> insted</p>
                <div className="divider">OR</div>
                <div>
                    <SigninProvider redirect='/' />
                </div>
            </div>


        </section>
    );
};

export default SignUp;



 