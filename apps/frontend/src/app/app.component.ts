import { Component } from '@angular/core'

@Component({
  selector: 'ubisoft-dna-tech-project-root',
  template: `
    <div class="container-fluid my-5">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor() {}
}
