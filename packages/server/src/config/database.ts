import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Contestant } from "../entity/Contestant";
import { TierList } from "../entity/TierList";
import { TierEntry } from "../entity/TierEntry";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "eurovision_tier_list",
  synchronize: true,
  logging: false,
  entities: [User, Contestant, TierList, TierEntry],
  subscribers: [],
  migrations: [],
});