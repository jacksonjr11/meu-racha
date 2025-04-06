import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PersonEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
