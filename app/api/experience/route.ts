import { makeCollectionHandlers } from "@/lib/crud";
import { validateExperience } from "@/lib/validation";

export const { GET, POST } = makeCollectionHandlers("experience", validateExperience);
