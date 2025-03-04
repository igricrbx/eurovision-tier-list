import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Contestant } from "./Contestant";
import { TierList } from "./TierList"; // Make sure this import exists and is correct

@Entity()
export class TierEntry {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  tier!: string; // A, B, C, D, E, F
  
  @Column({ default: 0 })
  order!: number;

  @ManyToOne(() => Contestant, contestant => contestant.tierEntries)
  contestant!: Contestant;

  // This relation is causing the error - we need to make sure TierList entity exists
  @ManyToOne(() => TierList, tierList => tierList.entries)
  tierList!: TierList;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}