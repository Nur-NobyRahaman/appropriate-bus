import { Box, Button, Typography } from '@mui/material';
import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const CheckoutForm = ({ price, name, email, setSuccessPayment,setTrans,trans }) => {
    console.log("🚀 ~ file: CheckoutForm.js:8 ~ CheckoutForm ~ price:", price)
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [success, setSuccess] = useState(null);
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState()

    useEffect(() => {
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                price
            }),
        })
            .then((res) => res.json())
            .then((data) => {

                if (data?.clientSecret) {
                    setClientSecret(data?.clientSecret)
                }
                console.log(data, "admin Place Name");
            });
    }, [price])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || elements == null) {
            return;
        }
        // const { error: submitError } = await elements.submit();
        // if (submitError) {
        //     // Show error to your customer
        //     setErrorMessage(submitError.message);
        //     return;
        // }

        // const res = await fetch('/create-intent', {
        //     method: 'POST',
        // });
        // const { client_secret: clientSecret } = await res.json();



        // const { error } = await stripe.confirmPayment({
        //     //`Elements` instance that was used to create the Payment Element
        //     elements,
        //     clientSecret,
        //     confirmParams: {
        //         return_url: 'https://example.com/order/123/complete',
        //     },
        // });

        // if (error) {
        //     // This point will only be reached if there is an immediate error when
        //     // confirming the payment. Show error to your customer (for example, payment
        //     // details incomplete)
        //     setErrorMessage(error.message);
        //     console.log(error);
        // } else {
        //     setErrorMessage('')
        //     console.log("success");
        //     // Your customer will be redirected to your `return_url`. For some payment
        //     // methods like iDEAL, your customer will be redirected to an intermediate
        //     // site first to authorize the payment, then redirected to the `return_url`.
        // }

        const card = elements.getElement(CardElement)

        if (card == null) {
            return;
        }


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErrorMessage(error?.message)
            console.log('[error]', error);
            setSuccess('')
            setSuccessPayment(false)
        } else {
            setErrorMessage('')
            setSuccess('')
            setSuccessPayment(false)
            console.log('[PaymentMethod]', paymentMethod);
        }

        // confirm 
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );
        if (intentError) {
            setErrorMessage(intentError?.message)
            setSuccess('')
            setSuccessPayment(false)
        }
        else {
            setErrorMessage('')
            console.log(paymentIntent);
            setSuccessPayment(true)
            setTransactionId(paymentIntent?.id)
            setTrans(paymentIntent?.id)
            setSuccess('Congrats! Your payment is completed.')
        }

    }
    return (
        <Box>
            {/* <form onSubmit={handleSubmit}>
                <PaymentElement />
                <Button sx={{ mt: 1 }} fullWidth color='success' variant='contained' type="submit" disabled={!stripe || !elements || !clientSecret}>
                    Pay
                </Button>

                {errorMessage && <div>{errorMessage}</div>}
            </form> */}
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <Typography sx={{ color: 'red', mt: 1, mb: 1 }}>{errorMessage}</Typography>
                <Typography sx={{ color: 'green', mt: 1, mb: 1 }}>{success}</Typography>
                <Typography sx={{ color: 'green', mt: 1, mb: 1 }}>{success && 'Your TransactionId :' + transactionId}</Typography>
                <Button sx={{ mt: 1 }} fullWidth color='success' variant='contained' type="submit" disabled={!stripe || !elements}>
                    Payment
                </Button>
            </form>
        </Box>
    );
};

export default CheckoutForm;