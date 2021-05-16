import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(
    private auth: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

  }

  btnSenha() {
    let inputSenha = window.document.querySelector('#senha')

    if(inputSenha?.getAttribute('type') == 'password') {
        inputSenha?.setAttribute('type', 'text');

    }else {
        inputSenha?.setAttribute('type', 'password');

    }

  }

  logar() {
    this.auth.login(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp;

      environment.id = this.usuarioLogin.id;
      environment.nome = this.usuarioLogin.nome;
      environment.senha = this.usuarioLogin.senha;
      environment.token = this.usuarioLogin.token;

      console.log("ID: "+ environment.id);
      console.log("Nome: "+ environment.nome);
      console.log("Senha: "+ environment.senha);
      console.log("Token: "+ environment.token);

      this.router.navigate(['/home']);

    }, erro => {
      if(erro.status == 500) {
        console.log('Usuario ou senha invalidos.');

      }

    })
  }

}
