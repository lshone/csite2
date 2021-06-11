import { Timestamp } from '@firebase/firestore-types';

export class Post {
id?: string;
image?: any;
author?: string;
title?: string | null;
content?: string;
claps?: number;
draft?: boolean;
published?: Timestamp;

}

