/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import firebase from 'firebase/app';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {

  postForm!: FormGroup
  imageURL: string = '//:0'
  uploadPercent!: Observable<number | undefined>
  downloadURL!: Observable<string>

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private auth: AuthService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.postForm = this.fb.group({
      title: [''],
      content: [''],
      draft: [false]
    })
  };

  savePost(){
    const formData: Post = {
      author: this.auth.authState.displayName || this.auth.signInEmail,
      authorId: this.auth.currentId || null || undefined,
      title: this.postForm.get('title')?.value,
      image: this.imageURL || null,
      content: this.postForm.get('content')?.value || false,
      draft: this.postForm.get('draft')?.value,
      published: firebase.firestore.Timestamp.fromDate(new Date()),
      trending: 0
    }
    console.log('imageURL after reset1: ' + this.imageURL )
    if (!this.postForm.untouched ){
       this.postService.create(formData)
       this.postForm.reset();
       this.imageURL='';

      }


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
