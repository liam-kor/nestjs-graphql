import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { number } from 'joi';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class UserProfileInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
  @Field((type) => User)
  user?: User;
}
