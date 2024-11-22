export interface Template {
    _id:string,
    title: string; 
    description: string; 
    footer: string; 
    Variables: Record<string, string>; 
    buttons: Record<string, string>; 
    createdAt?: Date; 
    updatedAt?: Date; 
  }
  