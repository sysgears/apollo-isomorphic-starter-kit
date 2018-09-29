import React from 'react';

import { merge } from 'lodash';
import { unfoldTo } from 'fractal-objects';

export class BaseModule {
  public localization?: any[];
  public link?: any[];
  public createNetLink?: () => any;
  public connectionParam?: any[];
  public reducer?: any[];
  public resolver?: any[];
  public routerFactory?: () => any;
  public rootComponentFactory?: any[];
  public dataRootComponent?: any[];
  public data?: any[];

  constructor(...modules: BaseModule[]) {
    unfoldTo(this, modules);
  }
}

type Constructor = new (...args: any[]) => BaseModule;

export const addBaseModuleMethods = (Base: Constructor) => {
  return class extends Base {
    get localizations() {
      return this.localization;
    }

    get reducers() {
      return merge({}, ...this.reducer);
    }

    get resolvers() {
      return merge({}, ...this.resolver);
    }

    get connectionParams() {
      return this.connectionParam;
    }

    get router() {
      return this.routerFactory();
    }

    public getDataRoot(root: any) {
      let nestedRoot = root;
      for (const component of this.dataRootComponent) {
        nestedRoot = React.createElement(component, {}, nestedRoot);
      }
      return nestedRoot;
    }

    public getWrappedRoot(root: any, req?: any) {
      let nestedRoot = root;
      for (const componentFactory of this.rootComponentFactory) {
        nestedRoot = React.cloneElement(componentFactory(req), {}, nestedRoot);
      }
      return nestedRoot;
    }
  };
};
