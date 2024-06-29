const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Ensure the secret key is set in your environment variables

export async function POST(req) {
    const { amount } = await req.json(); // Assuming the amount is passed in the request body
    try {
        const intent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'inr',
            automatic_payment_methods: { enabled: true },
        });
        return new Response(JSON.stringify({ client_secret: intent.client_secret }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}
