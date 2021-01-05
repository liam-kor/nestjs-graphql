import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly posts: Repository<Post>,
  ) {}
  getAll(): Promise<Post[]> {
    return this.posts.find();
  }

  create(createPostDto: CreatePostDto) {
    const newPost = this.posts.create(createPostDto);
    return this.posts.save(newPost);
  }

  update({ id, data }: UpdatePostDto) {
    return this.posts.update(id, { ...data });
  }
}
