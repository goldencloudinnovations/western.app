"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { subscribeToNewsletter } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { siteText } from "@/content/site-text";

const initialState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="h-11 w-full px-6 sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {siteText.signup.submitPendingLabel}
        </>
      ) : (
        siteText.signup.submitLabel
      )}
    </Button>
  );
}

export function SignUpForm() {
  const [state, formAction] = useActionState(
    subscribeToNewsletter,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="mx-auto w-full max-w-xl rounded-xl border border-border/70 bg-background/60 p-4 shadow-sm backdrop-blur-sm sm:p-5">
      <form
        ref={formRef}
        action={formAction}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={siteText.signup.emailPlaceholder}
          required
          className="h-11 w-full flex-1 bg-background/90"
          aria-label={siteText.signup.emailAriaLabel}
        />
        <SubmitButton />
      </form>
      {state.message ? (
        <p className={`mt-2 text-left text-sm leading-tight ${state.success ? "text-muted-foreground" : "text-destructive"}`}>
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
