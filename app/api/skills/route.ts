import { makeCollectionHandlers } from "@/lib/crud";
import { validateSkill } from "@/lib/validation";

export const { GET, POST } = makeCollectionHandlers("skills", validateSkill);
