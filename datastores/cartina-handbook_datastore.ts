import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";
import "https://deno.land/std@0.145.0/dotenv/load.ts";

export const CartinaDatastore = DefineDatastore({
  name: Deno.env.get("DATASTORE_ID") || "",
  primary_key: "id",
  attributes: {
    id: { type: Schema.types.string },
    words: { type: Schema.types.string },
    content: { type: Schema.types.string },
  },
});
