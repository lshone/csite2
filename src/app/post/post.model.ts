import { Timestamp } from '@firebase/firestore-types';

export class Post {
id?: string;
image?: any;
authorId?: string;
author?: string;
title?: string | null;
content?: string;
trending?: number;
draft?: boolean;
published?: Timestamp;

}

