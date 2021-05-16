import { Categoria } from "./Categoria";
import { Marca } from "./Marca";
import { Usuario } from "./Usuario";

export class Produto {
	id: number;
	nome: string;
	img: string;
	qtdProduto: number;
	preco: number;
	usuarios: Usuario;
	marcas: Marca;
  categorias: Categoria;

}
