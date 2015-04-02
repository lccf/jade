'use strict';

var bemBlockArr = [];
var bemElementArr = [];
var lastBlock = '';
var lastElement = '';
var typeSplitChar = ':';
var arrSplitChar = ' ';
var elementPrefix = '__';
var modifierPrefix = '-';

exports.setBlock = function(indent, name) {
  while (indent < lastBlock.indent) {
    lastBlock = bemBlockArr.pop();
  }
  lastBlock = {indent: indent, name: name}
  bemBlockArr.push(lastBlock);
}

exports.setElement = function(indent, name) {
  while (indent < lastElement.indent) {
    lastElement = bemElementArr.pop();
  }
  lastElement = {indent: indent, name: name}
  bemElementArr.push(lastElement);
}

exports.getBlock = function(indent) {
  return lastBlock.name;
}
exports.getElement = function(indent) {
  return lastElement.name;

}

exports.getClass = function(block, element, modifiers) {
  var buf = [];
  var className = block;

  if (modifiers) {
    for (var i=0; i<modifiers.length; i++) {
      className = block;
      if (element) {
        className += elementPrefix + element;
      }
      if (modifiers[i]) {
        className += modifierPrefix + modifiers[i];
      }
      buf.push(className);
    }
  }
  else if (element){
    className += elementPrefix + element;
  }
  return buf.length ? buf.join(' ') : className;
}

exports.parse = function(indent, val) {
  var block = '';
  var element = '';
  var modifiers = '';
  var arr = val.replace(/^"|"$/g, '').split(typeSplitChar);

  if (arr.length === 3) {
    block = this.getBlock();
    element = this.getElement();
    modifiers = arr[2].split(arrSplitChar);
  } else if (arr.length === 2) {
    block = this.getBlock();
    element = arr[1]
    this.setElement(indent, element);
  } else if (arr.length = 1) {
    block = arr[0];
    this.setBlock(indent, block);
  }
  // console.log(this.getBemClass(block, element, modifiers));
  return ('"'+ this.getClass(block, element, modifiers) +'"');
}

