import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@fullstack/api-interfaces';

@Component({
  selector: 'fullstack-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}
}
