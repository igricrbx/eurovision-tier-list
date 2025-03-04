import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { TierEntry } from "./TierEntry";
import { Stage } from "../types/Stage";

@Entity()
export class TierList {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ unique: true, nullable: true })
  shareCode!: string;

  @Column({ default: false })
  isPublic!: boolean;

  @Column({
    type: "enum",
    enum: Stage,
    default: Stage.GRAND_FINAL
  })
  stage!: Stage;

  @ManyToOne(() => User, user => user.tierLists)
  user!: User;

  @OneToMany(() => TierEntry, tierEntry => tierEntry.tierList, { cascade: true })
  entries!: TierEntry[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}