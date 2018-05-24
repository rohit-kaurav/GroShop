import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TestService {

  constructor(private http: Http) { }

  getData(){
    return this.http.get('/testData/users');
  }

}
