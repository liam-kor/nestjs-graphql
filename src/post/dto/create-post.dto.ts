import { Field, InputType, OmitType } from '@nestjs/graphql';
import { Post } from '../entities/post.entity';

@InputType()
export class CreatePostDto extends OmitType(Post, ['id']) {}
