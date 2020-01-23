import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Message } from '@ubisoft-dna-tech-project/api-interfaces'

@Component({
  selector: 'ubisoft-dna-tech-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello')
  constructor(private http: HttpClient) {}
}
