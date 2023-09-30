import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import './payment.css'

const Payment = () => {
    const stripePromise = loadStripe('pk_test_51NFaHHHYxG7WJPCTk0y79QmctbWnn8Q2zwqMbAsbPFLk8dCWhGi4I1K8009zXtNnfn9lFdcC9vzudTOvo1s7JV3W00xwgxC3Ju');

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default Payment;