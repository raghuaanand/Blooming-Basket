const stripe = require("stripe")("sk_test_51O53Q3SJW60CFH2vFenpjpBuNHFjLdquYxVDFtRMgh8dl3lUdvijrgQhUSnqFGmVxhSenpizZWwfat6P4HokQttE00VW7SOHTK");

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