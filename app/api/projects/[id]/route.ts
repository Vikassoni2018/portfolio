import { makeCollectionItemHandlers } from "@/lib/crud";
import { validateProject } from "@/lib/validation";

export const { PUT, DELETE } = makeCollectionItemHandlers("projects", validateProject);
