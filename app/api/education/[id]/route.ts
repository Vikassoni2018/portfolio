import { makeCollectionItemHandlers } from "@/lib/crud";
import { validateEducation } from "@/lib/validation";

export const { PUT, DELETE } = makeCollectionItemHandlers("education", validateEducation);
