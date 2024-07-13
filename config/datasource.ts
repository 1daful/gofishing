import "reflect-metadata"
import { DataSource } from "typeorm"
//import { UserModel } from "../model/User";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "aws-0-us-east-1.pooler.supabase.com",
    port: 5432,
    username: "postgres.liagcjidevdramrvncxm",
    password: "KFmb3mrQORl7YSaX",
    database: "postgres",
    synchronize: true,
    logging: false,
   // entities: [UserModel],
    subscribers: [],
    migrations: [],
})

export function init() {
    AppDataSource.initialize()
        .then(() => {
            // here you can start to work with your database
    console.log("Database tables created")
        })
        .catch((error) => console.log('typeeorm ', error))   
}