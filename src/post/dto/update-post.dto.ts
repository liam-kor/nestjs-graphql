import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreatePostDto } from './create-post.dto';

@InputType()
export class UpdatePostInputType extends PartialType(CreatePostDto) {}

@InputType()
export class UpdatePostDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdatePostInputType)
  data: UpdatePostInputType;
}
