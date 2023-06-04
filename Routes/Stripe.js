import express from "express";
import Stripe from 'stripe';
import dotenv from "dotenv";

dotenv.config();
const stripe = Stripe(process.env.STRIPE_KEY);

const stripeRouter = express.Router();

stripeRouter.post('/create-checkout-session/:id', async (req, res) => {
  const id = req.params.id;
  const { orderr, userId } = req.body;

  const line_items = orderr.map((item) => {
    console.log(item.name, item.image[0].img);
    const firstImage = item.image.length > 0 ? item.image[0].img : null;
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [`http://localhost:3000${item.image[0].img }`],
          metadata: {
            id: item._id
          },
        },
        unit_amount: item.price * 100
      },
      quantity: item.qty,
    }
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000/checkout-success',
    cancel_url: `http://localhost:3000/order/${id}`,
  });

  res.send({ 
    url: session.url,
});
});


import bodyParser from 'body-parser';





const endpointSecret ='whsec_63939d4265110ae1d7f0b3b9ad73a055bf60e5ca30f48c01131807ae8e6e0517'

// server.js



stripeRouter.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      console.log(checkoutSessionCompleted)
      const orderId = checkoutSessionCompleted.client_reference_id;
      const paymentIntentId = checkoutSessionCompleted.payment_intent;

      // Update your order status to "paid" using orderId
      // Perform any other necessary actions based on the event

      console.log(`Payment completed for order ${orderId}. Payment Intent ID: ${paymentIntentId}`);
      break;

    // Handle other event types as needed

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});



export default stripeRouter;
