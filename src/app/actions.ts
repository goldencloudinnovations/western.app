"use server";

import { z } from "zod";
import { saveSubscriber } from "@/lib/newsletter-db";
import { siteText } from "@/content/site-text";

const emailSchema = z
  .string()
  .email({ message: siteText.signup.invalidEmailMessage });

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
        ? siteText.signup.successNewMessage
        : siteText.signup.successExistingMessage,
    };
  } catch {
    return {
      success: false,
      message: siteText.signup.genericErrorMessage,
    };
  }
}
