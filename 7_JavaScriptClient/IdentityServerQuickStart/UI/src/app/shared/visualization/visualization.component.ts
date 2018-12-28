import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppGlobals } from '../../core/services/AppGlobals';

@Component({
  selector: 'graph-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VisualizationComponent implements OnInit {

  basePath = '';

  constructor(private appGlobals: AppGlobals) {
    this.basePath = appGlobals.getBasePath();
  }

  ngOnInit() {
    this.loadScript();
  }

  public loadScript() {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = `./assets/libs/graph/core.js?v=1`;
    // script.src = '../assets/libs/graph/core.js?v=1';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

}
