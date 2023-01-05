import type { TalkRequest } from "@prisma/client";

import { prisma } from "~/db.server";

export async function createTalkRequest(
  request: Omit<TalkRequest, "id" | "createdAt" | "updatedAt">
) {
  return prisma.talkRequest.create({
    data: {
      name: request.name,
      pronouns: request.pronouns,
      email: request.email,
      talkType: request.talkType,
      talkTopic: request.talkTopic,
      consent: request.consent,
    },
  });
}
