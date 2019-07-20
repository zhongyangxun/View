function Watcher (vm, exp, cb) {
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  this.value = this.get();
}

Watcher.prototype = {
  update () {
    this.run();
  },
  get () {
    Dep.target = this;
    let value = this.vm[this.exp];
    Dep.target = null;
    return value;
  },
  run () {
    let val = this.vm.data[this.exp];
    let oldVal = this.value;
    if (val !== oldVal) {
      this.value = val;
      this.cb.call(this.vm, val, oldVal);
    }
  }
}
