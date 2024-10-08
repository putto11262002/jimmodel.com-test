import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { fileInfoTable } from "./file-metadata";
import { webAssetTags, webAssetTypes } from "@/lib/constants/web-asset";

export const webAssetTagsEnum = pgEnum("web_asset_tags", webAssetTags);

export const webAssetTypesEnum = pgEnum("web_asset_types", webAssetTypes);

export const webAssetTable = pgTable("web_assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  fileId: uuid("file_id")
    .notNull()
    .references(() => fileInfoTable.id),
  contentType: text("content_type").notNull(),
  width: integer("width"),
  height: integer("height"),
  type: webAssetTypesEnum("type").notNull(),
  alt: text("alt"),
  tag: webAssetTagsEnum("tag").notNull(),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at", {
    mode: "string",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date().toISOString()),
});
