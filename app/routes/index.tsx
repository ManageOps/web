import { json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { createRequestForPaper } from "~/models/request-for-paper.server";
import { rfpSchema } from "../utils/rfpSchema";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  const validation = rfpSchema.safeParse(values);

  if (validation.success) {
    await createRequestForPaper(validation.data);
    return json({ success: true, errors: [], values });
  } else {
    const errors = validation.error.format();
    return json({ success: false, errors, values });
  }
}

export default function Index() {
  const actionData = useActionData();

  return (
    <main>
      <header>
        <div className="hero">
          <div className="hero__body">
            <h1 className="h-logo">
              Manage<span>Ops</span>
            </h1>
            <h2>A community of Engineering Managers and Technical Leaders</h2>
          </div>
        </div>
      </header>
      <div className="main">
        <section className="main__body">
          <h2>
            Our vision is to create a world where bad leadership or bad
            management is no longer the number one cause of attrition.
          </h2>
          <p>
            Our first step towards this is creating a community of technical
            leaders and managers who want to learn, grow and develop so that the
            teams they are in can learn, grow and develop.
          </p>
          <p>
            ManageOps runs regular meetups aimed at people working in technology
            leadership. You might be an engineering manager, a tech lead, or
            anybody else interested in how to run software teams and build
            technical excellence in your organisation.
          </p>
          <p>
            We welcome anybody from any technical role or industry, whether you
            have management experience or are just curious about the role and
            want to learn more. If you want to improve your engineering
            leadership skills and meet peers across the West Midlands, then
            ManageOps is for you.
          </p>
        </section>
        <section className="main__body">
          {actionData?.success ? (
            <p>Thank you for your request. Someone will be in touch.</p>
          ) : (
            <Form method="post" reloadDocument>
              <div className="form__group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={actionData?.values.name}
                />
                {actionData?.errors.name ? (
                  <p style={{ color: "red" }}>
                    {actionData.errors.name._errors.toString()}
                  </p>
                ) : null}
              </div>
              <div className="form__group">
                <label htmlFor="pronouns">Pronouns</label>
                <input
                  type="text"
                  id="pronouns"
                  name="pronouns"
                  defaultValue={actionData?.values.pronouns}
                />
              </div>
              <div className="form__group">
                <label htmlFor="email">Email *</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  defaultValue={actionData?.values.email}
                />
                {actionData?.errors.email ? (
                  <p style={{ color: "red" }}>
                    {actionData.errors.email._errors.toString()}
                  </p>
                ) : null}
              </div>
              <div className="form__group">
                <label htmlFor="talk_type">Talk type</label>
                <input
                  type="text"
                  id="talk_type"
                  name="talk_type"
                  defaultValue={actionData?.values.talk_type}
                />
              </div>
              <div className="form__group">
                <label htmlFor="talk_topic">Talk topic</label>
                <textarea
                  id="talk_topic"
                  name="talk_topic"
                  defaultValue={actionData?.values.talk_topic}
                ></textarea>
              </div>
              <div className="form__group">
                <label htmlFor="consent">
                  I'd like to be contacted by a ManageOps organiser*
                </label>
                <input
                  type="checkbox"
                  name="consent"
                  id="consent"
                  defaultChecked={actionData?.values.consent}
                />
                {actionData?.errors.consent ? (
                  <p style={{ color: "red" }}>
                    {actionData.errors.consent._errors.toString()}
                  </p>
                ) : null}
                <p>
                  <small>
                    We only use and keep this information to contact you about
                    organising a talk at ManageOps
                  </small>
                </p>
              </div>
              <button>Submit</button>
            </Form>
          )}
        </section>
      </div>
    </main>
  );
}
