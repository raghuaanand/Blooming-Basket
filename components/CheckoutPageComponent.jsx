"use client"
import React, { useRef, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import jwt from 'jsonwebtoken'
import { toast } from "./ui/use-toast";
import axios from "axios";
import { url } from "@/lib/url";
import { useRouter } from "next/navigation";
const CheckoutForm = () => {
  const router =  useRouter()
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false)
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const user = localStorage.getItem('userProfileStatus')
  const deocoded = jwt.decode(user, process.env.SECRET_KEY)
  const shippingDetails = localStorage.getItem('shippingInfo')
  const cartItem =  JSON.parse(localStorage.getItem('cartItem'))
  const taxPrice = sessionStorage.getItem('OrderTax')
  const itemPrice = sessionStorage.getItem('OrdersubTotal')
  const TotalAmount = sessionStorage.getItem('OrderTotal')
  const shippingCharges = sessionStorage.getItem('DeliveryCharge') 

  if(!shippingDetails || cartItem.length === 0 ){
    return router.push('/products')
  }

  const submitHandler = async (e) => {
    e.preventDefault(); 
    try {
      if (!stripe || !elements) return;
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              email: email,
            },
          },
        },
        redirect: "if_required",
      });
      console.log("result", result);

      if (result.error) {
        setPaymentError(
          "Payment failed. Please check your card details and try again."
        );
        setPaymentSuccess(null);
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setloading(true)
          try {
                const taxPrice = sessionStorage.getItem('OrderTax')
                const itemPrice = sessionStorage.getItem('OrdersubTotal')
                const TotalAmount = sessionStorage.getItem('OrderTotal')
                const shippingCharges = sessionStorage.getItem('DeliveryCharge')
                if(!taxPrice || !itemPrice || !TotalAmount || !shippingCharges ){
                    toast({
                      description:"Please Add Items in your cart",
                      variant:"custom"
                    })
                    window.location.href='/products'
                  }  
                const cartItems = JSON.parse(localStorage.getItem('cartItem')) 

                  const userEmail = localStorage.getItem('userProfileStatus')
                  const OrderItems = 
                    cartItems.map((item)=>(
                      {
                        name:item.name,
                        price:item.price,
                        quantity:item.qty,
                        image:item.img[0].url,
                        productID:item.id
                      }
                    ))      
                
                const shippinginfo = JSON.parse(shippingDetails)
                  const ShippingInfo={
                    address:shippinginfo.Address,
                    city:shippinginfo.City,
                    pincode:shippinginfo.PinCode,
                    phoneno:shippinginfo.phoneNo
                  }
                      const user = jwt.decode(userEmail, process.env.SECRET_KEY)              
                    const { data } = await axios.post(` /api/createOrder`,{
                      OrderItems,
                      shippingDetails:ShippingInfo,
                      user:user.user._id,
                      itemPrice,
                      taxPrice,
                      shippingCharges,
                      TotalAmount
                    })
          } catch (error) {
            console.error('error',error);
            toast({
              description: "Something went wrong, please try again later.",
              variant:"custom"      
              });
          }
          window.location.href = '/successPage'
          console.log(result);

        } else {
          console.log("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    loading ? 
    <div>
      loading...
    </div>
    : 
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Payment Page</h2>
      <form className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            value={deocoded.user.email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="my-2 p-2 w-full border rounded"
          />
        </label>
        <div>
          <PaymentElement />
        </div>
        <div className="flex justify-between font-bold " >
         <div> SubTotal :</div> <div>₹{itemPrice}</div>
        </div>
        <div className="flex justify-between font-bold " >
         <div> Tax :</div> <div>₹{taxPrice}</div>
        </div>
        <div className="flex justify-between font-bold " >
          <div> Shipping :</div> <div>₹{shippingCharges}</div>
        </div>
        <hr></hr>
        <div className="flex justify-between font-bold " >
          <div> Total Amount :</div> <div>₹{TotalAmount}</div>
        </div>
        <div>

        </div>
        <button
          onClick={submitHandler}
          className="bg-primary text-white py-2 px-4 rounded focus:outline-none"
        >
          Initiate Payment
        </button>
        
      </form>
      {paymentError && <p style={{ color: "red" }}>{paymentError}</p>}
      {paymentSuccess && <p style={{ color: "green" }}>{paymentSuccess}</p>}
    </div>
  );
};

export default CheckoutForm;