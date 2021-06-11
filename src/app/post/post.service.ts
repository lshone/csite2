import { Injectable } from '@angular/core';
import { AngularFirestore,
         AngularFirestoreCollection,
         AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../post/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postCollection!: AngularFirestoreCollection<Post>;

  constructor(
    private afs: AngularFirestore
    ) {
    this.postCollection = this.afs.collection('posts', ref => ref.orderBy('claps', 'desc').limit(10));
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
}
