import { ComponentFactory, ComponentFactoryResolver, Injectable, Injector, ApplicationRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { LoaderComponent } from './loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {
  }

  public show(): void {
    const loader = document.createElement('loader');
    const loaderFactory: ComponentFactory<any> = this._componentFactoryResolver.resolveComponentFactory(LoaderComponent);
    const loaderref = loaderFactory.create(this.injector, [], loader);
    this.applicationRef.attachView(loaderref.hostView);
    document.body.appendChild(loader);
  }
  public hide(): void {
    let nodes: any = document.getElementsByTagName("loader");
    while (nodes[0]) {
      nodes[0].parentNode.removeChild(nodes[0]);
    }

  }

}
