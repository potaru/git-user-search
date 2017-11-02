import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './views/app.component.html',
})
export class AppComponent implements OnInit {
  title = 'app';
  username: string;
  url: string;
  data: { req: string };
  git_name: string;
  git_img: string;
  git_url: string;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.username = '';
    this.url = 'https://api.github.com/users/';
    this.data = {req: ''};
    this.git_name = '';
    this.git_img = '';
    this.git_url = '';
  }

  onSubmit() {
    this.getUsers()
    .subscribe(result => {
      this.git_name = result['login'];
      this.git_img = result['avatar_url'];
      this.git_url = result['html_url'];
      console.log(result);
    },
    error => {
      console.log(error);
    });
  }
  getUsers() {
    this.data = {'req': this.url + this.username};
    return this.http.get(this.data.req).map(result => result).catch(err => {console.log(err); return err; });
  }
}
