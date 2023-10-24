import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

type UserRole = 'client' | 'owner' | 'delivery';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column((type) => String)
  @Field((type) => String)
  email: string;

  @Column((type) => String)
  @Field((type) => String)
  password: string;

  @Column((type) => String)
  @Field((type) => String)
  role: UserRole;
}
