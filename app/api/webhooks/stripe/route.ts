import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_WEBHOOK_SECRET || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.error();
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-01-27.acacia",
  });

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Falha na verificação da assinatura do webhook:", err);
    return NextResponse.error();
  }

  switch (event.type) {
    case "invoice.paid": {
      // Update User Plan
      const { customer, subscription, subscription_details } =
        event.data.object;

      const customerId =
        typeof customer === "string"
          ? customer
          : customer && "id" in customer
            ? customer.id
            : null;
      const subscriptionId =
        typeof subscription === "string"
          ? subscription
          : subscription && "id" in subscription
            ? subscription.id
            : null;

      const prismaUserId = subscription_details?.metadata?.prisma_user_id;

      await db.user.update({
        where: { id: prismaUserId },
        data: {
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          subscriptionPlan: "premium",
        },
      });
      break;
    }

    case "customer.subscription.deleted": {
      // Remove User Plan
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );

      const prismaUserId = subscription.metadata.prisma_user_id;
      if (!prismaUserId) {
        return NextResponse.error();
      }

      await db.user.update({
        where: { id: prismaUserId },
        data: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
          subscriptionPlan: null,
        },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
};
