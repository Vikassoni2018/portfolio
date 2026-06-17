import { makeCollectionHandlers } from "@/lib/crud";
import { validateProject } from "@/lib/validation";

export const { GET, POST } = makeCollectionHandlers("projects", validateProject);
