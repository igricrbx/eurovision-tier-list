import "dotenv/config";
import { DataSource } from "typeorm";
import { Contestant } from "./entity/Contestant";
import { TierEntry } from "./entity/TierEntry";
import { TierList } from "./entity/TierList";
import { User } from "./entity/User";
import { AddLyricsColumn1633455678912 } from "./migration/AddLyricsColumn";
import { AddEurovisionStages1719493876543 } from "./migration/1719493876543-AddEurovisionStages";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "eurovision",
  synchronize: false,
  logging: true,
  entities: [Contestant, TierEntry, TierList, User],
  migrations: [AddLyricsColumn1633455678912, AddEurovisionStages1719493876543],
  subscribers: [],
});
