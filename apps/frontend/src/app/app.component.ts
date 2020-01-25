import { Component } from '@angular/core'

@Component({
  selector: 'ubisoft-dna-tech-project-root',
  template: `
    <div class="container-fluid py-5 main">
      <div class="container">
        <small class="text-muted">{{ title }}</small>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: ['.main { height: 100vh; background-color: whitesmoke }']
})
export class AppComponent {
  title = 'Ubisoft DNA Technical Project'
  constructor() {}
}
