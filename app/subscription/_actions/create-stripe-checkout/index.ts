"use server";

import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

export const createStripeCheckout = async () => {
  const serverSession = await getServerSession(authOptions);
  const userId = serverSession?.user.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-01-27.acacia",
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: process.env.APP_URL,
    cancel_url: process.env.APP_URL,
    subscription_data: {
      metadata: {
        prisma_user_id: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
  });
  return { sessionId: session.id };
};
