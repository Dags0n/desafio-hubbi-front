import { IItem } from './IItem';

export interface IVenda {
  id: number;
  valorTotal: number;
  status: string;
  date: string;
  itens: IItem[];
}