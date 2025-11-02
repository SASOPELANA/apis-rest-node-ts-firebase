// tipado para los productos

export interface Productos {
  id: string;
  name: string;
  name_lower?: string;
  price: number;
  categories: string[];
  categories_lower?: string[];
  description_lower?: string;
  description?: string;
  image: string;
}
