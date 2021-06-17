/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post!: Post
  postId: string = ''
  editing: boolean = false
  posts!: Observable<Post[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getPost()
  }

  getPost():void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    //console.log('post id from post detail: ' + id)
    this.postService.getPostData(id).subscribe(post => this.post = post!)
    this.postId = id;
  }

  deletePost(postId: string, image: string){
    //const id = this.route.snapshot.paramMap.get('id') || '';
    console.log('deleting post' + postId)
    this.postService.delete(postId);
    this.postService.deleteImage(image);
    this.router.navigate(['/blog']);

  }

  update(id: string){
    const formData = {
      title: this.post.title,
      image: this.post.image,
      content: this.post.content,
      draft: this.post.draft
    }
    this.postService.update(this.post.id, formData)
    this.editing = false
  }
  trending(value: number | undefined){
    if (this.post.id)
      { this.postService.update(this.post.id, {trending: value! + 1})}
  }
}
