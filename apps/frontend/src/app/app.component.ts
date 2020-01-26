import { Component } from '@angular/core'

@Component({
  selector: 'ubisoft-dna-tech-project-root',
  template: `
    <div class="container-fluid py-5">
      <div class="container">
        <small>{{ title }}</small>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Ubisoft DNA Technical Project - maxeber'
  constructor() {}
}
