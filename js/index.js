function View (options) {
  this.vm = this;
  this.data = options.data;
  this.methods = options.methods;

  Object.keys(this.data).forEach(key => {
    this.proxyKey(key);
  });

  observe(this.data);
  new Compile(options.el, this.vm);
  return this;
}

View.prototype = {
  proxyKey (key) {
    Object.defineProperty(this, key, {
      configuration: false,
      enumerable: true,
      get () {
        return this.data[key];
      },
      set (newVal) {
        this.data[key] = newVal;
      }
    });
  }
}