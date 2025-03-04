import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { TierEntry } from "./TierEntry";

@Entity()
export class Contestant {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  country!: string;

  @Column()
  artist!: string;

  @Column()
  songTitle!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column({ nullable: true })
  songUrl!: string;
  
  @Column({ type: "text", nullable: true })
  lyrics!: string;

  @Column()
  year!: number;

  @Column({ default: false })
  inFirstSemiFinal!: boolean;

  @Column({ default: false })
  inSecondSemiFinal!: boolean;

  @Column({ default: false })
  inGrandFinal!: boolean;

  @OneToMany(() => TierEntry, tierEntry => tierEntry.contestant)
  tierEntries!: TierEntry[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}