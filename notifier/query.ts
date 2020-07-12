import { Pool } from "pg";

const pool = new Pool({
  user: "sangchulkim",
  host: "localhost",
  database: "notifier",
  port: 5432
});
