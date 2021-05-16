import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = new Usuario();
  confirmarSenha: string;

  constructor(
    private auth: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

  }

  confirmeSenha(event: any) {
    this.confirmarSenha = event.target.value;

  }

  btnSenha() {
    let inputSenha = window.document.querySelector('#senha')

    if(inputSenha?.getAttribute('type') == 'password') {
        inputSenha?.setAttribute('type', 'text');

    }else {
        inputSenha?.setAttribute('type', 'password');

    }

  }

  btnConfirmarSenha() {
    let inputSenha = window.document.querySelector('#confirmasenha');

    if(inputSenha?.getAttribute('type') == 'password') {
        inputSenha?.setAttribute('type', 'text');

    }else {
        inputSenha?.setAttribute('type', 'password');

    }

  }

  cadastrar() {
    /* VERIFICA SE AS SENHAS DIGITADAS, SAO IGUAIS */
    if(this.usuario.senha != this.confirmarSenha) {
      /* INFORMA UM ALERTA AO USUARIO */
      alert('As senhas estao incorretas!');

    }else {
      /* CHAMA O METODO CADASTRAR CRIADO NO NOSSO SERVICE */
      /* subscribe ==> CONVERTE UM ARQUIVO TypeScript EM UM ARQUIVO JSON/JavaScript */
      /* ARMAZENA OS DADOS DENTRO DE UM ATRIBUTO TEMPORARIO CHAMADO resp */
      this.auth.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        /* POR SUA VEZ ATRIBUI OS DADOS DE resp AO USUARIO DENTRO DA BASE DE DADOS*/
        this.usuario = resp;
        /* REDIRECIONA O USUARIO A PAGINA DE login APOS O CADASTRO TER SIDO REALIZADO COM SUCESSO */
        this.router.navigate(['/login']);
        /* INFORMA UM ALERTA AO USUARIO DE CADASTRO BEM SUCEDIDO */
        alert('Usuario cadastrado com sucesso!');

        /* CASO OCORRA UMA MENSAGEM DE ERRO, MOSTRA ESSE ERRO NO CONSOLE */
      }, erro => {
        console.log(erro.status);
        console.log(erro);

      });

    }

  }

}
