import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}
  @Query(() => [Post])
  posts(@Args('title') title: string): Promise<Post[]> {
    return this.postService.getAll();
  }

  @Mutation((returns) => Boolean)
  async createPost(@Args('input') createPostDto: CreatePostDto) {
    try {
      await this.postService.create(createPostDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async updatePost(@Args('input') updatePostDto: UpdatePostDto) {
    try {
      this.postService.update(updatePostDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
