import "reflect-metadata";
import { DataSource } from "typeorm";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "aws-0-us-east-1.pooler.supabase.com",
    port: 5432,
    username: "postgres.liagcjidevdramrvncxm",
    password: "KFmb3mrQORl7YSaX",
    database: "postgres",
    synchronize: true,
    logging: false,
    subscribers: [],
    migrations: [],
});
export function init() {
    AppDataSource.initialize()
        .then(() => {
        console.log("Database tables created");
    })
        .catch((error) => console.log('typeeorm ', error));
}
