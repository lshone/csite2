export interface User {
  uid: string;
  email: string | null;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
  website?: string;
  location?: string;
  bio?: string;
}
