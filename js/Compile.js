function Compile (el ,vm) {
  this.vm = vm;
  this.el = document.querySelector(el);
  this.fragment = null;
  this.init();
}

Compile.prototype = {
  init () {
    this.fragment = this.nodeToFragment(this.el);
    this.compile(this.fragment);
    this.el.appendChild(this.fragment);
  },
  nodeToFragment (el) {
    let fragment = document.createDocumentFragment();
    let child = el.firstChild;
    while(child) {
      fragment.appendChild(child);
      child = el.firstChild;
    }
    return fragment;
  },
  compile (el) {
    var childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => {
      let reg = /\{\{\s*(.*?)\s*\}\}/;
      let text = node.textContent;

      if (this.isElementNode(node)) {
        this.compileElement(node);
      } else if (this.isTextNode(node) && reg.test(text)) {
        this.compileText(node, reg.exec(text)[1]);
      }

      if (node.childNodes) {
        this.compile(node);
      }
    });
  },
  compileElement (node) {
    let attrs = node.attributes;
    Array.prototype.forEach.call(attrs, (attr) => {
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        if (attr.name.indexOf('v-on:') === 0) {
          let event = attr.name.slice(5);
          let exp = attr.value;
          this.compileEvent(this.vm, node, event, exp);
        } else if (attr.name.indexOf('v-model') === 0) {
          this.compileVModel(this.vm, node, attr.value);
        }
        node.removeAttribute(attrName);
      }
    })
  },
  compileText (node, exp) {
    let initText = this.vm[exp];
    this.updateText(node, initText);
    new Watcher(this.vm, exp, (value) => {
      this.updateText(node, value);
    });
  },
  compileEvent (vm, el, event, exp) {
    let eventHandler = vm.methods[exp];
    el.addEventListener(event, eventHandler);
  },
  compileVModel (vm, node, exp) {
    let value = vm[exp];
    this.updateModel(node, value);

    new Watcher(vm, exp, (val) => {
      this.updateModel(node, val);
    });

    node.addEventListener('input', (e) => {
      vm[exp] = e.target.value;
    });
  },
  updateText (node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value;
  },
  updateModel (node, value) {
    node.value = typeof value === 'undefined' ? '' : value;
  },
  isTextNode (node) {
    return node.nodeType === 3;
  },
  isElementNode (node) {
    return node.nodeType === 1;
  },
  isDirective (attrName) {
    return attrName.indexOf('v-') === 0;
  }
}
