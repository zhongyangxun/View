import Dep from './dep.js'

function Observer (data) {
  return this.defineReactive(data);
}

Observer.prototype.defineReactive = function (data) {
  let dep = new Dep();
  return new Proxy(data, {
    get (target, property) {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return target[property];
    },
    set (target, property, newVal) {
      if (target[property] === newVal) {
        return true;
      }
      target[property] = newVal;
      dep.notify();
      return true;
    }
  });
}

Observer.observe = function (value, vm) {
  if (!value || typeof value !== 'object') {
    return;
  }

  return new Observer(value);
}


export default Observer;
