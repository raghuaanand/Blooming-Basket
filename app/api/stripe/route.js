const stripe = require("stripe")("");

export async function POST(){
    const intent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'inr',
      automatic_payment_methods: {enabled: true},
    });
    return Response.json({
            client_secret: intent.client_secret
        });
  }