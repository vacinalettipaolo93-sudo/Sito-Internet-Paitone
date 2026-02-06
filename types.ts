
export interface Court {
  id: string;
  name: string;
  type: 'Tennis' | 'Padel';
  surface: string;
  indoor: boolean;
  image: string;
}

export interface SportEvent {
  id: string;
  title: string;
  date: string;
  category: 'Tennis' | 'Padel';
  description: string;
}

export interface EventRegistration {
  id?: string;
  eventTitle: string;
  userName: string;
  userPhone: string;
  createdAt: any;
}

export type Section = 'home' | 'about' | 'courts' | 'events' | 'contact' | 'booking' | 'admin';
