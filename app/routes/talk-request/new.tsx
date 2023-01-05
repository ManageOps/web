import { Form } from "@remix-run/react";

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
    <textarea name="talkTopic" id="talkTopic" cols={30} rows={10}></textarea>
  </label>
  <label htmlFor="consent">
    <input type="checkbox" name="speaker-consent" id="consent" required /> I'd
    like to be contacted by a ManageOps organiser *
  </label>
  <p className="italic">
    We only use and keep this information to contact you about organising a talk
    at ManageOps
  </p>
  <button type="submit">Submit</button>
</Form>;
