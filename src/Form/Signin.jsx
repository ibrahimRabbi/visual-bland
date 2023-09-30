import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../Authentication/AuthContext';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SigninProvider from './SigninProvider';
import { Roller } from 'react-spinners-css';

const Signin = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm()
    const { signin } = useContext(Context)
    const location = useLocation()
    const redirectTo = location.state?.redi || '/'
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setloading] = useState(false)



    const loginHandler = (data) => {

        const { email, password, confirm } = data

        if (password !== confirm) {
            setError('confirm Password doesnt Match')
        } else {
            setError('')
            setloading(true)
            signin(email, password)
                .then((res) => {
                    fetch('http://localhost:5000/jwt', {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body : JSON.stringify({email:res.email})
                    })
                        .then(res => res.json())
                        .then(res => {
                            localStorage.setItem('token', res.refreshToken)
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Sign in successfull',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            navigate(redirectTo)
                    })
                })
                .catch(error => {
                    setloading(false)
                    if (error.message == "Firebase: Error (auth/user-not-found).") {
                        setError('user is not exist in this application plz provied a valid password and email')
                    } else if (error.message == 'Firebase: Error (auth/wrong-password).') {
                        setError('invalid password plz provide a valid password')
                    }
                })
        }

    }

    if (loading) {
        return <Roller className="mt-48 block mx-auto" />
    }

    return (
        <section>
            <div className="mt-10 w-1/2 mx-auto ">
                <div className="w-[70%] mx-auto text-sky-600">
                    <h1 className="text-4xl font-semibold text-center">Sign In</h1>
                    <hr className="mt-3" />
                </div>
                <form className='space-y-3 w-[80%] mx-auto mt-6' onSubmit={handleSubmit(loginHandler)}>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">email</span>
                        </label>
                        <input className="border border-sky-500 rounded-2xl p-2" placeholder="email" {...register('email', { required: true })} />
                        {errors.email && <p className="text-red-500">email ius requird</p>}
                    </div>

                    <div className="form-control w-full  ">
                        <label className="label">
                            <span className="label-text">password</span>
                        </label>
                        <input className="border border-sky-500 rounded-2xl p-2" placeholder="password" {...register('password', { required: true })} />
                        {errors.password && <p className="text-red-500">password is requird</p>}
                    </div>

                    <div className="form-control w-full  ">
                        <label className="label">
                            <span className="label-text">confirm-password</span>
                        </label>
                        <input className="border border-sky-500 rounded-2xl p-2" placeholder="confirm-password" {...register('confirm', { required: true })} />
                        {errors.confirm && <p className="text-red-500">confirm password is required</p>}
                    </div>
                    <p className='text-red-600 font-semibold'>{error}</p>
                    <input value='sign In' type="submit" className='bg-sky-500 hover:bg-sky-600 text-slate-800 btn w-full mt-16' />
                </form>
                <p className="font-semibold text-sm text-center mt-7">dont Have an Account? <Link to='/signup' className="text-sky-500 font-bold">Sign Up</Link> insted</p>
                <div className="divider">OR</div>
                <div>
                    <SigninProvider redirect={redirectTo} />
                </div>
            </div>

        </section>
    );
};

export default Signin;