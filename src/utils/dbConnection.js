import pg from "pg";

const dbConnection = process.env.NEXT_PUBLIC_DATABASE_URL;

export const db = new pg.Pool({
  connectionString: dbConnection,
});
