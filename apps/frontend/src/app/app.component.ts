import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'ubisoft-dna-tech-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private http: HttpClient) {}
}
