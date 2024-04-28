import { ManyToMany, JoinTable, OneToOne, Column, JoinColumn, Relation } from "typeorm"
import { Group } from "./Group"
import { Member } from "./Member"

export class Admin {
    id!: string

    @OneToOne(() => Member, (member) => member.admin)
    @JoinColumn() 
    member!: string

    @Column()
    role!: string

    @ManyToMany(() => Group, (group) => group.admins)
    @JoinTable()
    groups!: Relation<Group[]>

}