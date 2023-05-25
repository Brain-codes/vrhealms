import React, { useState } from 'react';
import axios from 'axios'
import { usePaystackPayment } from 'react-paystack';
const URL = 'https://bac.solarcredit.io/v0.1/api'
const user = JSON.parse(localStorage.getItem("vrhealms"));
const publicKey = process.env.REACT_APP_PAYSTACT_API_KEY;

export const PaystackPaymentButton = ({ amount, bgColorUpdate, textColorUpdate, statusTextUpdate }) => {

    const [payLoader, setPayLoader] = useState(false)

    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        return handleSuccess(reference)
    };

    //Function to call after sucessfull purchase
    const handleSuccess = async (payload) => {
        setPayLoader(true)
        try {
            const res = await axios.post(`${URL}/p/verifyToFundWallet`, {

            })
            setPayLoader(false)
            if (res.data.success) {
                console.log('Transaction Sucessfull')
            } else {
                console.log(res.data.message)
            }
        } catch (error) {
            setPayLoader(false)
            console.log(error.message)
        }

    }

    // you can call this function anything
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('Payment Cancelled')
    }


    const initializePayment = usePaystackPayment({
        reference: (new Date()).getTime().toString(),
        email: user?.email,
        amount: amount * 100,
        publicKey: publicKey,
    });


    return (
        <button
            style={{ backgroundColor: bgColorUpdate }}
            className="transac-status-details"
            onClick={() => { initializePayment(onSuccess, onClose) }}
        >
            <p style={{ color: textColorUpdate }}>{payLoader ? 'Paying..' : statusTextUpdate}</p>
        </button>
    );
};

