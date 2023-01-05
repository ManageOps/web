import { safeString, safeBoolean } from "~/utils";
import { createTalkRequest } from "~/models/talk-request.server";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { TalkRequest } from "@prisma/client";
import { Form, Outlet, useActionData } from "@remix-run/react";

type ActionData = {
  status: "success" | "error";
  fields: Omit<TalkRequest, "id" | "createdAt" | "updatedAt">;
  errors: {
    name?: string | null;
    email?: string | null;
    consent?: string | null;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const fields = {
    name: safeString(form.get("name")),
    email: safeString(form.get("email")),
    consent: safeBoolean(form.get("consent")),
    talkTopic: safeString(form.get("talkTopic")),
    talkType: safeString(form.get("talkType")),
    pronouns: safeString(form.get("pronouns")),
  };
  let actionData: ActionData = { fields, errors: {}, status: "error" };

  actionData.errors = {
    name: fields.name ? null : "Name is required",
    email: fields.email ? null : "Email is required",
    consent: fields.consent ? null : "Consent is required",
  };
  const hasErrors = Object.values(actionData.errors).some(
    (errorMessage) => errorMessage
  );
  if (hasErrors) {
    return json<ActionData>(actionData, { status: 400 });
  }

  await createTalkRequest(actionData.fields);
  actionData.status = "success";

  return json<ActionData>(actionData, { status: 201 });
};

export default function Index() {
  const actionData = useActionData<ActionData>();
  return (
    <main className="">
      <h1>
        Manage
        <br /> Ops
      </h1>
      <h2>
        A community of engineering managers and technical leaders based in the
        Midlands
      </h2>

      <Outlet />
      {actionData.status === 'error' :(
      <Form action="" method="post">
        <label htmlFor="name">
          Name:* <input type="text" name="name" id="name" required />
        </label>
        <label htmlFor="pronouns">
          Pronouns:{" "}
          <input
            type="text"
            name="pronouns"
            id="pronouns"
            placeholder="e.g. they/them, he/him, she/her"
          />
        </label>
        <label htmlFor="email">
          Email:* <input type="text" name="email" id="email" required />
        </label>
        <label htmlFor="talkType">
          Talk type:{" "}
          <input
            type="text"
            name="talkType"
            id="talkType"
            placeholder="e.g. 5-7 min lightning talk, 20 min talk, workshop, not sure"
          />
        </label>
        <label htmlFor="talkTopic">
          What might your talk be about?{" "}
          <textarea
            name="talkTopic"
            id="talkTopic"
            cols={30}
            rows={10}
          ></textarea>
        </label>
        <label htmlFor="consent">
          <input type="checkbox" name="speaker-consent" id="consent" required />{" "}
          I'd like to be contacted by a ManageOps organiser *
        </label>
        <p className="italic">
          We only use and keep this information to contact you about organising
          a talk at ManageOps
        </p>
        <button type="submit">Submit</button>
      </Form>
        )}
    </main>
  );
}
