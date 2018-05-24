import { TestService } from './services/test-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private service: TestService){
  }

  ngOnInit(){
    // this.service.getData()
    //   .subscribe((users) => {
    //     console.log(users.json());
    //     //console.log(JSON.parse(users['_body']).data);
    //     // this.title = JSON.parse(users['_body']).data[0].name;
    //   });
  }
}
