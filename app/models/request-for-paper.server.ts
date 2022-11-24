import type { RequestForPaper } from "@prisma/client";

import { prisma } from "~/db.server";

export type { RequestForPaper } from "@prisma/client";

export function createRequestForPaper({
  name,
  pronouns,
  email,
  talk_type,
  talk_topic,
  consent,
}: Omit<RequestForPaper, "id">) {
  return prisma.requestForPaper.create({
    data: {
      name,
      pronouns,
      email,
      talk_type,
      talk_topic,
      consent,
    },
  });
}
