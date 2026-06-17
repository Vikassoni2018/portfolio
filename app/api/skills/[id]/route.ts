import { makeCollectionItemHandlers } from "@/lib/crud";
import { validateSkill } from "@/lib/validation";

export const { PUT, DELETE } = makeCollectionItemHandlers("skills", validateSkill);
