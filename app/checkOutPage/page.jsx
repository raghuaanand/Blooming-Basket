"use client"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckoutForm from "@/components/CheckoutPageComponent";
import { url } from "@/lib/url";
const CheckOutPage = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const stripePromise = loadStripe('pk_test_51O53Q3SJW60CFH2vz9lxzAToslro9gX2762cFIGO50kMo0vOxZq0GCKeIiBRh4W0c2AU1VvzvOURFwAjcwsS5YvU00WH9f7Pa1');
  
  useEffect(() => {
    const prepareStripe = async () => {
      try {
        // console.log(totalAmount);
        const {data} = await axios.post(
          ` /api/stripe`
          // ,
          // { "amount":totalAmount }
        );
        // Assuming the response has a property named client_secret
        setClientSecret(data.client_secret);
      } catch (error) {
        console.error("Error preparing Stripe:", error);
      }
    };

    prepareStripe();
  }, []); // Only re-run the effect when `amount` changes
  const appearance = {
    theme: 'flat',
  };

  return ( clientSecret ?
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>: <></>
  );
};

export default CheckOutPage