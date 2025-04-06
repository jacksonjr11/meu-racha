import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  uuid: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  active: boolean;
}
