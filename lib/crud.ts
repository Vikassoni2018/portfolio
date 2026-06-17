import { NextResponse, type NextRequest } from "next/server";
import { jsonError, parseJson, requireApiAuth } from "@/lib/api";
import { getCollection, saveCollection } from "@/lib/data";
import type { CollectionMap, CollectionName } from "@/lib/types";

type Validator<TName extends CollectionName> = (input: unknown) => Omit<CollectionMap[TName], "id">;

export function makeCollectionHandlers<TName extends CollectionName>(name: TName, validate: Validator<TName>) {
  return {
    async GET() {
      const items = await getCollection(name);
      return NextResponse.json(items);
    },

    async POST(request: NextRequest) {
      const authError = requireApiAuth(request);
      if (authError) return authError;

      try {
        const payload = validate(await parseJson(request));
        const items = await getCollection(name);
        const item = { id: crypto.randomUUID(), ...payload } as CollectionMap[TName];
        await saveCollection(name, [item, ...items]);
        return NextResponse.json(item, { status: 201 });
      } catch (error) {
        return jsonError((error as Error).message);
      }
    }
  };
}

export function makeCollectionItemHandlers<TName extends CollectionName>(name: TName, validate: Validator<TName>) {
  return {
    async PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
      const authError = requireApiAuth(request);
      if (authError) return authError;

      try {
        const { id } = await params;
        const payload = validate(await parseJson(request));
        const items = await getCollection(name);
        const index = items.findIndex((item) => item.id === id);
        if (index === -1) return jsonError("Item not found.", 404);

        const updated = { id, ...payload } as CollectionMap[TName];
        const nextItems = [...items];
        nextItems[index] = updated;
        await saveCollection(name, nextItems);
        return NextResponse.json(updated);
      } catch (error) {
        return jsonError((error as Error).message);
      }
    },

    async DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
      const authError = requireApiAuth(request);
      if (authError) return authError;

      const { id } = await params;
      const items = await getCollection(name);
      const nextItems = items.filter((item) => item.id !== id);
      if (nextItems.length === items.length) return jsonError("Item not found.", 404);

      await saveCollection(name, nextItems);
      return NextResponse.json({ ok: true });
    }
  };
}
