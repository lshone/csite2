/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/core/auth.service';
import { Post } from '../post.model'
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {
  @Input() post!: Post
  editing = false

  uploadPercent!: Observable<number | undefined>
  downloadURL!: Observable<string>
  imageURL!: String

  constructor(
    private postService: PostService,
    public auth: AuthService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  delete(id: string){
    this.postService.delete(id);
  }

  update(id: string){
    const formData = {
      title: this.post.title,
      image: this.imageURL || this.post.image,
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

  uploadPostImage(event: any){

    const file = event.target.files[0];
    const path = `posts/${file.name}`

    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files');
    } else {
      const task = this.storage.upload(path, file);
      this.uploadPercent = task.percentageChanges();

      const storageRef = this.storage.ref(path);


      task.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(url => {
          (this.imageURL = url);
          this.downloadURL = storageRef.getDownloadURL();
         // this.userService.updateProfileData(this.user?.displayName, url)
          console.log('imageURL of photo ' + this.imageURL); // <-- do what ever you want with the url..
          console.log('-----url of photo ' + url); // <-- do what ever you want with the url..
        });
      })
    ).subscribe();
    }
  }
}
