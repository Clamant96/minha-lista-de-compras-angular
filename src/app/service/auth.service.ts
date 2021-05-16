import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public api = environment.server + environment.porta;

  autorizacao = {
    headers: new HttpHeaders().set('Authorizer', environment.token)

  }

  constructor(
    private http: HttpClient

  ) { }

  login(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {

    return this.http.post<UsuarioLogin>(`${this.api}/usuarios/logar`, usuarioLogin, this.autorizacao);
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {

    return this.http.post<Usuario>(`${this.api}/usuarios/cadastrar`, usuario, this.autorizacao);
  }

  logado() {
    let visibilidade: boolean;

    if(environment.token != '') {
      visibilidade = true;

    }else {
      visibilidade = false;

    }

    return visibilidade;

  }

}
