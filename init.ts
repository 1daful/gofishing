import "reflect-metadata"
import { DataSource } from "typeorm"
import { Member } from "./model/Member"
import { Message } from "./model/Message"
import { Attendance } from "./model/Attendance"
import { Event } from "./model/Event"
import { Group } from "./model/Group"
import { Invitation } from "./model/Invitation"
import { ReachOut } from "./model/ReachOut"
import { Service } from "./model/Service"

export const entities: any[] = []
const AppDataSource = new DataSource({
    type: "postgres",
    host: "aws-0-us-east-1.pooler.supabase.com",
    port: 6543,
    username: "postgres.liagcjidevdramrvncxm",
    password: "Glory2glow!",
    database: "postgres",
    entities: [
        Member, Message, Event, 
        Group, Invitation, ReachOut,
        Attendance, Service
    ],
    synchronize: true,
    logging: false,
})

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))


const photoRepository = AppDataSource.getRepository(Service)
const allPhotos = await photoRepository.find()
console.log("All photos from the db: ", allPhotos)

const meAndBearsPhoto = await photoRepository.findOneBy({
    name: "Me and Bears",
})