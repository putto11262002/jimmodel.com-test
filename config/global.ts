import dotenv from "dotenv";
import { ConfigSchema } from "@/lib/validators/config";
dotenv.config({
  path: [
    ".env",
    ...(process.env.NODE_ENV === "production"
      ? [".env.production"]
      : [".env.development"]),
  ],
});

const config = ConfigSchema.parse({
  root: {
    user: process.env.ROOT_USER,
    email: process.env.ROOT_EMAIL,
    password: process.env.ROOT_PASSWORD,
  },
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
  },
  s3: {
    accessKey: process.env.S3_ACCESS_KEY,
    secretKey: process.env.S3_SECRET_KEY,
    endpoint: process.env.S3_ENDPOINT,
    port: process.env.S3_PORT,
    bucketName: process.env.S3_BUCKET_NAME,
  },
});

export default config;
