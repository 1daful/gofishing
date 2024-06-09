/*import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

@Entity()
export class UserModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column()
    age!: number
}*/
/*const userRepository = MyDataSource.getRepository(UserModel)

const user = new UserModel()
user.firstName = "Timber"
user.lastName = "Saw"
user.age = 25
await userRepository.save(user)

const allUsers = await userRepository.find()
const firstUser = await userRepository.findOneBy({
    id: 1,
}) // find by id
const timber = await userRepository.findOneBy({
    firstName: "Timber",
    lastName: "Saw",
}) // find by firstName and lastName*/

//await userRepository.remove(timber)

/*export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    fullName: text('full_name'),
    phone: varchar('phone', { length: 256 }),
  });

const connectionString = process.env.DATABASE_URL

const client = postgres(connectionString)
const db = drizzle(client);

const allUsers = await db.select().from(users);*/

const sequelize = new Sequelize('database', 'postgres.liagcjidevdramrvncxm', 'KFmb3mrQORl7YSaX', {
    host: 'aws-0-us-east-1.pooler.supabase.com',
    dialect: 'postgres'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });
  
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
  sequelize.close()