function Observer (data) {
  return this.defineReactive(data);
}

Observer.prototype = {
  defineReactive (data) {
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
          return;
        }
        target[property] = newVal;
        dep.notify();
      }
    });
  }
}

function observe (value, vm) {
  if (!value || typeof value !== 'object') {
    return;
  }

  return new Observer(value);
}

function Dep () {
  this.subs = [];
}

Dep.prototype = {
  addSub (sub) {
    this.subs.push(sub);
  },
  notify () {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}

Dep.target = null;
