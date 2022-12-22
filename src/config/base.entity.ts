import {PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

export abstract class EntityBase{

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @CreateDateColumn({
        name:"create_ad",
        type:"timestamp"
    })
    createdAd!: Date;

    @UpdateDateColumn({
        name:"update_ad",
        type:"timestamp"
    })
    updateAd!: Date;
}


