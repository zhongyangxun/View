import Compile from './compile.js';
import Observer from './observer.js'

function View (options) {
  this.data = options.data;
  this.methods = options.methods;

  let proxy = new Proxy(this, this.proxyDesc);
  proxy.vm = proxy;

  this.data = Observer.observe(proxy.data);

  new Compile(options.el, proxy.vm);
  return proxy;
}

View.prototype = {
  proxyDesc: {
    get (target, property) {
      if (target.data[property]) {
        return target.data[property];
      }
      return target[property];
    },
    set (target, property, newVal) {
      target.data[property] = newVal;
      return true;
    }
  }
}

export default View;
