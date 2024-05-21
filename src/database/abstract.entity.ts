import { Column, PrimaryGeneratedColumn } from "typeorm";

export class AbstractEntity<T> {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable: false })
    tenantId: number;

    constructor(item: Partial<T>) {
        Object.assign(this, item, 0);
    }    
}