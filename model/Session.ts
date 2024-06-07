import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { PageView } from "../src/utils/types";
import { IDataView } from "./IDataView";
import { Member } from "./Member";
import { Event } from "./Event";

@Entity()
export class Session implements IDataView {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'timestamptz' })
    start_at!: Date;

    @Column({ type: 'timestamptz' })
    end_at!: Date;

    @Column()
    name!: string;

    @ManyToOne(() => Member, member => member.sessions)
    author!: Relation<Member>;

    @Column()
    timeRemaining!: string;

    @Column()
    content!: string;

    @ManyToOne(() => Event, event => event.sessions)
    event!: Relation<Event>;

    create?(data?: any): Promise<PageView> {
        throw new Error("Method not implemented.");
    }
    getListData(query?: any): Promise<PageView> {
        throw new Error("Method not implemented.");
    }
    getSingleData?(id: string): Promise<PageView> {
        throw new Error("Method not implemented.");
    }
    
}