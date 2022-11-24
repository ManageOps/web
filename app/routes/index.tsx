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
        <h1>ManageOps</h1>
      </header>
      <section>
        <p>
          ManageOps is a new, regular meetup aimed at people working in
          technology leadership. You might be an engineering manager, a tech
          lead, or anybody else interested in how to run software teams and
          build technical excellence in your organisation.
        </p>

        <p>
          Hosted by Steve Heyes of Birdie and Matt Andrews of the Economist,
          each event will feature an informal talk by a member of the
          engineering management community, with space for Q&A and discussion.
          We'll also open the floor to a round table discussion on a given topic
          each month (eg. recruitment and retention, salary banding and
          promotion, how to manage performance etc) where attendees can discuss
          their challenges and learnings and get feedback and support from their
          peers.
        </p>

        <p>
          ManageOps is a safe space to discuss these issues in confidence – we
          want attendees to feel able to discuss things openly with their peers,
          so we're sticking to Chatham House Rule. We also have a code of
          conduct to discourage poor behaviour or anything that makes people
          feel unsafe.
        </p>

        <p>
          We welcome anybody from any technical role or industry, whether you
          have management experience or are just curious about the role and want
          to learn more. If you want to improve your engineering leadership
          skills and meet peers across the West Midlands, then ManageOps is for
          you.
        </p>
      </section>
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
    </main>
  );
}
