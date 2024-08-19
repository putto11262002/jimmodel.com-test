import { Gender, genders } from "@/lib/types/common";
import { z } from "zod";
export const localQueries = ["local", "non-local", "all"] as const;
export type LocalQuery = (typeof localQueries)[number];
export const directBookingQueries = [
  "direct booking",
  "non-direct booking",
  "all",
] as const;
export type DirectBookingQuery = (typeof directBookingQueries)[number];
export const inTownQueries = ["in town", "out town", "all"] as const;
export type InTownQuery = (typeof inTownQueries)[number];

export const SearchParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .nullable()
    .transform((value) => {
      if (!value) {
        return 1;
      }
      // regex to check if the string is valid number
      if (/^\d+$/.test(value)) {
        return parseInt(value);
      }
      return 1;
    }),
  local: z
    .enum(localQueries)
    .or(z.any().transform(() => "all" as LocalQuery))
    .optional()
    .default("all"),
  inTown: z
    .enum(inTownQueries)
    .or(z.any().transform(() => "all" as InTownQuery))
    .optional()
    .default("all"),
  directBooking: z
    .enum(directBookingQueries)
    .or(z.any().transform((v) => "all" as DirectBookingQuery))
    .optional()
    .default("all"),
});

export const PathParamsSchema = z.object({
  gender: z.string().transform((value) => {
    if (genders.includes(value as any)) {
      return value as Gender;
    }
    return undefined;
  }),
});
