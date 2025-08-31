export interface Complaint {
  _id?: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  dateSubmitted: Date;
}

export type ComplaintFormData = Omit<Complaint, '_id' | 'dateSubmitted' | 'status'>;

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}