import { IVenda } from './IVenda';
import { IItem } from './IItem';

export interface ICompra {
  id: number;
  valorTotal: number;
  venda: IVenda;
  date: string;
  itens: IItem[];
}