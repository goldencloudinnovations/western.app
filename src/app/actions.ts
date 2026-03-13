"use server";

import { z } from "zod";
import { saveSubscriber } from "@/lib/newsletter-db";

const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email address." });

type FormState = {
  success: boolean;
  message: string;
};

export async function subscribeToNewsletter(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email");
  const validatedEmail = emailSchema.safeParse(email);

  if (!validatedEmail.success) {
    return {
      success: false,
      message: validatedEmail.error.errors[0].message,
    };
  }

  try {
    const { inserted } = saveSubscriber(validatedEmail.data);

    return {
      success: true,
      message: inserted
        ? "Thank you for subscribing! We'll keep you updated."
        : "You're already subscribed. We'll keep you updated.",
    };
  } catch {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
