import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: "app-users",
  templateUrl: "users.component.html"
})
export class UsersComponent implements OnInit {
  token : String;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('Inicia el componente');
    //this.dologin();

    this.doLoginAsync().then( res => {
      console.log('Respuesta del servidor: ' +res);

      this.token = res.token;
      this. getHistory();
      setInterval(() => {
        this. getHistory();
      }, 5000);
    }).catch(err=>console.error('Error al iniciar sesión'))
  }

  getUsers(): void {
    console.log('Entra a getUsers');
    const token = '';
    const apiUrl = 'https://192.168.1.110:5000/usuarios/'
    const headers = new Headers({
      'Authorization': `Bearer ${token}`
    });

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'
    };

    fetch(apiUrl, requestOptions).then( response => {
      console.log('response: ', response);
    });
  }

  getHistory(): void {
    console.log('Entra a getHistory');
    const token = this.token;
    console.log(token);
    const apiUrl = 'http://127.0.0.1:5000/historial'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.get(apiUrl, { headers })
    .subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
      },
      (error) => {
        console.error('Error al realizar la petición:', error);
      }
    );
  }

  dologin() : void {
    console.log('Entra a doLogin()');
    //const apiUrl = 'http://192.168.1.110:5000/auth/login';
    const apiUrl = 'http://localhost:5000/auth/login';

    var data = {
      username: 'FDGFFFF',
      pass : 'uyguyguyhiuy'
    };

    var body = JSON.stringify(data);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post(apiUrl, body, { headers }).subscribe( 
      (res) => {
        console.log('Respuesta del servidor:', res);
      },
      (err) => {
        console.error('Error al enviar datos:', err);
      }
    )
  }

  doLoginAsync() : Promise<any> {
    return new Promise ( (resolve, reject) => {
      console.log('Entra a doLoginAsync()');
      //const apiUrl = 'http://192.168.1.110:5000/auth/login';
      const apiUrl = 'http://localhost:5000/auth/login';

      var data = {
        username: 'FDGFFFF',
        pass : 'uyguyguyhiuy'
      };

      var body = JSON.stringify(data);

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post(apiUrl, body, { headers }).subscribe( 
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      )
    });
  }
}
