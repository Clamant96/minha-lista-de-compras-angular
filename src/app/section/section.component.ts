import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Marca } from '../model/Marca';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { SectionService } from '../service/section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  usuario: Usuario = new Usuario();
  orcamentoUsuario: number;
  idUsuario = environment.id;

  novoProduto: Produto = new Produto();
  listaDeProdutos: Produto[];
  idProduto: number;

  novaMarca: Marca = new Marca();
  listaDeMarcas: Marca[];
  idMarca: number;

  novaCategoria: Categoria = new Categoria();
  listaDeCategorias: Categoria[];
  idCategoria: number;

  constructor(
    private router: Router,
    private sectionService: SectionService

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(environment.token == '') {
      this.router.navigate(['/login']);

    }

    this.findAllByProdutos();
    this.findAllByMarcas();
    this.findAllByCategoria();
    this.findIdByUsuario(environment.id);

  }

  /* LISTAGEM ITENS */
  findAllByProdutos() {
    this.sectionService.findAllByProdutos().subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

    })

  }

  findAllByMarcas() {
    this.sectionService.findAllByMarca().subscribe((resp: Marca[]) => {
      this.listaDeMarcas = resp;

    })

  }

  findAllByCategoria() {
    this.sectionService.findAllByCategoria().subscribe((resp: Categoria[]) => {
      this.listaDeCategorias = resp;

    })

  }

  /* PESQUISA POR ID DE UM DETERMINADO ITEM */
  findByProduto(id: number) {
    this.sectionService.findByIdProduto(id).subscribe((resp: Produto) => {
      this.novoProduto = resp;

    })

  }

  findIdByMarca(id: number) {
    this.sectionService.findByIdMarca(id).subscribe((resp: Marca) => {
      this.novaMarca = resp;

    })

  }

  findIdByCategoria(id: number) {
    this.sectionService.findByIdCategoria(id).subscribe((resp: Categoria) => {
      this.novaCategoria = resp;

    })

  }

  findIdByUsuario(id: number) {
    this.sectionService.findoByIdUsuario(id).subscribe((resp: Usuario) => {
      this.orcamentoUsuario = resp.orcamento;

      console.log('RESP ORACAMENTO: '+ resp.orcamento);
      console.log('ORACAMENTO: '+ this.orcamentoUsuario);

    })

  }

  /* POSTANDO UM DETERMINADO ITEM */
  postProduto() {
    this.sectionService.postProduto(this.novoProduto).subscribe((resp: Produto) => {
      this.novoProduto = resp;

      this.novoProduto = new Produto();

      this.findAllByProdutos();

    })

  }

  postMarca() {
    this.sectionService.postMarca(this.novaMarca).subscribe((resp: Marca) => {
      this.novaMarca = resp;

      this.novaMarca = new Marca();

      this.findAllByMarcas();

    })

  }

  postCategoria() {
    this.sectionService.postCategoria(this.novaCategoria).subscribe((resp: Categoria) => {
      this.novaCategoria = resp;

      this.findAllByCategoria();

    })

  }

  /* POSTANDO UM DETERMINADO ITEM */
  putProduto() {
    /* ACESSAR O OBJETO USUARIO(ID), E DENTRO DELE INSERE O DADO VINDO DO ENVIROMENT */
    this.usuario.id = this.idUsuario;
    /* INSERE O ID DE USUARIO DENTRO DE POSTAGEM(USUARIO/AUTOR) */
    this.novoProduto.usuarios = this.usuario;

    this.sectionService.putProduto(this.novoProduto).subscribe((resp: Produto) => {
      this.novoProduto = resp;
      this.novoProduto.qtdProduto = resp.qtdProduto + 1;

      this.novoProduto = new Produto();

      this.findAllByProdutos();
      this.findIdByUsuario(environment.id);

    })

  }

  /* DELETA UM DETERMINADO ITEM */
  deleteProduto(id: number) {
    this.sectionService.deleteProduto(id).subscribe(() => {

      this.findAllByProdutos();

    })

  }

  /* ADICIONAR PRUTO AO CARRINHODO USUARIO */
  adicionarProdutoAoCarrinho(id: number) {
    this.sectionService.findByIdProduto(id).subscribe((resp: Produto) => {
      this.novoProduto = resp;

      /* ACESSAR O OBJETO USUARIO(ID), E DENTRO DELE INSERE O DADO VINDO DO ENVIROMENT */
      this.usuario.id = this.idUsuario;
      /* INSERE O ID DE USUARIO DENTRO DE POSTAGEM(USUARIO/AUTOR) */
      this.novoProduto.usuarios = this.usuario;

      if(this.novoProduto.qtdProduto >= 0){
        /* ADICIONA UM PRODUTO NA QTD DE PRODUTOS */
        this.novoProduto.qtdProduto = this.novoProduto.qtdProduto + 1;

      }

      this.sectionService.putProduto(this.novoProduto).subscribe((resp: Produto) => {
        this.novoProduto = resp;

        this.findIdByUsuario(environment.id);
        this.findAllByProdutos();

      })

      this.findIdByUsuario(environment.id);
      this.findAllByProdutos();

    })

  }

  /* RETIRAR PRUTO AO CARRINHODO USUARIO */
  retirarProdutoAoCarrinho(id: number) {
    this.sectionService.findByIdProduto(id).subscribe((resp: Produto) => {
      this.novoProduto = resp;

      /* ACESSAR O OBJETO USUARIO(ID), E DENTRO DELE INSERE O DADO VINDO DO ENVIROMENT */
      this.usuario.id = this.idUsuario;
      /* INSERE O ID DE USUARIO DENTRO DE POSTAGEM(USUARIO/AUTOR) */
      this.novoProduto.usuarios = this.usuario;

      if(this.novoProduto.qtdProduto >= 0){
        /* RETIRA UM PRODUTO DA QTD DE PRODUTOS */
        this.novoProduto.qtdProduto = this.novoProduto.qtdProduto - 1;

      }

      this.sectionService.putProduto(this.novoProduto).subscribe((resp: Produto) => {
        this.novoProduto = resp;

        this.findIdByUsuario(environment.id);
        this.findAllByProdutos();

      })

      this.findIdByUsuario(environment.id);
      this.findAllByProdutos();

    })

  }

}

/*
  AJUSTES:

  IMPLEMENTAR ASSOCIACAO DE USUARIO POR MEIO DO POST;
  AJUSTAR O PROBLEMA DE DEIXAR O USUARIO TIRAR PRODUTOS ATE FICAREM NEGATIVOS

*/
