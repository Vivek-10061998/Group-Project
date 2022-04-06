import { Component, Input } from '@angular/core';
import { FADE_IN_OUT } from './../shared/animations/fade-in-out.animation';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [FADE_IN_OUT]
})
export class LoaderComponent {
}
