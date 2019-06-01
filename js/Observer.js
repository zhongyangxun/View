function Observer (data) {
  this.data = data;
  this.walk(data);
}

Observer.prototype = {
  walk (data) {
    Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key]);
    });
  },
  defineReactive (data, key, val) {
    let dep = new Dep();
    observe(val);
    Object.defineProperty(data, key, {
      configurable: false,
      enumerable: true,
      get () {
        if (Dep.target) {
          dep.addSub(Dep.target)
        }
        return val;
      },
      set (newVal) {
        if (val === newVal) {
          return
        }
        val = newVal;
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
