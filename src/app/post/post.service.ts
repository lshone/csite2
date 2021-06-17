import { Injectable } from '@angular/core';
import { AngularFirestore,
         AngularFirestoreCollection,
         AngularFirestoreDocument } from '@angular/fire/firestore';

import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../post/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postCollection!: AngularFirestoreCollection<Post>;
  postDoc!: AngularFirestoreDocument<Post>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    ) {
    this.postCollection = this.afs.collection('posts', ref => ref.orderBy('trending', 'desc').limit(10));
    }

  create(data: Post){
    return this.postCollection.add(data);

  }

  getPosts(): Observable<Post[]>{
    return this.postCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };

      }))
    );
  }

  getPostData(id: string | null) {
    this.postDoc = this.afs.doc<Post>(`posts/${id}`)
    return this.postDoc.valueChanges();
  }

  getPost(id: string | undefined){
    return this.afs.doc<Post>(`posts/${id}`)
  }

  update(id: string | undefined, postData: Post) {
    return this.getPost(id).update(postData)
  }

  delete(id: string | undefined) {
    return this.getPost(id).delete()
  }
  deleteImage(image: string){
    const storageRef = this.storage.refFromURL(image);
    return storageRef.delete();
  }
}

