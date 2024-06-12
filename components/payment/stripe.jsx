"use server"
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";

export const paymentSetup = async ({
  stripePriceId,
  email,
  userId,  
  product
}) => {
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: ` /PaymentSuccess`,
    cancel_url: ` /PaymentFailed`,
    payment_method_types: ['card'],
    mode: 'payment',
    billing_address_collection: "auto",
    customer_email: email,
    line_items:[
        {
            price_data:{
                currency:"inr",
                unit_amount:product,
                product_data:{
                    name:"GreenMind"
                }
            },
            quantity:1
        }
      ],
      metadata: {
        userId: userId,
      },
    });
    return { url: stripeSession.url  };

}