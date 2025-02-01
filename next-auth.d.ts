/* eslint-disable no-unused-vars */
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends AdapterUser {
    subscriptionPlan?: string | null | undefined;
  }
  interface Session {
    user: {
      id: string;
      subscriptionPlan?: string | null | undefined;
    } & DefaultSession["user"];
  }
}
