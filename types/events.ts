interface EventObjInFirebase {
  date: string;
  description: string;
  image: string;
  location: string;
  title: string;
  isFeatured: boolean;
  dateObj: { date: number; month: number; year: number };
}

export interface EventsObj {
  [key: string]: EventObjInFirebase;
}

export interface EventObj extends EventObjInFirebase {
  id: string;
}
