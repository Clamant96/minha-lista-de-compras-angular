import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Marca } from '../model/Marca';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  public api = environment.server + environment.porta;

  autorizacao = {
    headers: new HttpHeaders().set('Authorizer', environment.token)

  }

  constructor(
    private http: HttpClient

  ) { }

  /* LISTAGEM ITENS */
  findAllByProdutos(): Observable<Produto[]> {

    return this.http.get<Produto[]>(`${this.api}/produtos`, this.autorizacao);
  }

  findAllByMarca(): Observable<Marca[]> {

    return this.http.get<Marca[]>(`${this.api}/marcas`, this.autorizacao);
  }

  findAllByCategoria(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(`${this.api}/categorias`, this.autorizacao);
  }

  /* PESQUISA POR ID DE UM DETERMINADO ITEM */
  findByIdProduto(id: number): Observable<Produto> {

    return this.http.get<Produto>(`${this.api}/produtos/${id}`, this.autorizacao);
  }

  findByIdMarca(id: number): Observable<Marca> {

    return this.http.get<Marca>(`${this.api}/marcas/${id}`, this.autorizacao);
  }

  findByIdCategoria(id: number): Observable<Categoria> {

    return this.http.get<Categoria>(`${this.api}/categorias/${id}`, this.autorizacao);
  }

  findoByIdUsuario(id: number): Observable<Usuario> {

    return this.http.get<Usuario>(`${this.api}/usuarios/${id}`, this.autorizacao);
  }

  /* PESQUISA POR NOME DE UM DETERMINADO ITEM */
  findByNomeProdutos(nome: string): Observable<Produto[]> {

    return this.http.get<Produto[]>(`${this.api}/produtos/nome/${nome}`, this.autorizacao);
  }

  /* CADASTRO DE UM DETERMINADO ITEM */
  postProduto(produto: Produto): Observable<Produto> {

    return this.http.post<Produto>(`${this.api}/produtos`, produto, this.autorizacao);
  }

  postMarca(marca: Marca): Observable<Marca> {

    return this.http.post<Marca>(`${this.api}/marcas`, marca, this.autorizacao);
  }

  postCategoria(categoria: Categoria): Observable<Categoria> {

    return this.http.post<Categoria>(`${this.api}/categorias`, categoria, this.autorizacao);
  }

  /* ATUALIZACAO DE UM DETERMINADO ITEM */
  putProduto(produto: Produto): Observable<Produto> {

    return this.http.put<Produto>(`${this.api}/produtos`, produto, this.autorizacao);
  }

  putMarca(marca: Marca): Observable<Marca> {

    return this.http.put<Marca>(`${this.api}/marcas`, marca, this.autorizacao);
  }

  putCategoria(categoria: Categoria): Observable<Categoria> {

    return this.http.put<Categoria>(`${this.api}/categorias`, categoria, this.autorizacao);
  }

  /* DELETANDO UM DETERMINADO ITEM */
  deleteProduto(id: number) {

    return this.http.delete<Produto>(`${this.api}/produtos/${id}`, this.autorizacao);
  }

  deleteMarca(id: number) {

    return this.http.delete<Marca>(`${this.api}/marcas/${id}`, this.autorizacao);
  }

  deleteCategoria(id: number) {

    return this.http.delete<Categoria>(`${this.api}/categorias/${id}`, this.autorizacao);
  }

  /* ACOES DO USUARIO */
  /*adicionaAoCarrinho(produto: Produto): Observable<Produto> {

    return this.http.put<Produto>(`${this.api}/produtos/adicionando`, produto, this.autorizacao);
  }*/

}
