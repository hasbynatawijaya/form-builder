"use server";

import { currentUser } from "@clerk/nextjs";

class UserNotFoundErr extends Error {}

export async function GetCurrentUser() {
  try {
    const user = await currentUser();
    return user;
  } catch (error) {
    throw new UserNotFoundErr("Please login first");
  }
}
