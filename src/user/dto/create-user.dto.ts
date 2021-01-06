import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserDto extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}
