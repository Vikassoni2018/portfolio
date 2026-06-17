import { makeCollectionHandlers } from "@/lib/crud";
import { validateEducation } from "@/lib/validation";

export const { GET, POST } = makeCollectionHandlers("education", validateEducation);
