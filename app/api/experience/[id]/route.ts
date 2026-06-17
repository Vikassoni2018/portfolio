import { makeCollectionItemHandlers } from "@/lib/crud";
import { validateExperience } from "@/lib/validation";

export const { PUT, DELETE } = makeCollectionItemHandlers("experience", validateExperience);
