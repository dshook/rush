module.exports = SymbolRegistry;

var _id = 0;
var _scopeId = 0;

/**
 * @private
 * @class
 * The method type data when creating a event method symbol
 */
function EventMethodType()
{
  this.id = ''+(_id++);

  this.methodSymbol = null;

  this.eventFactory = null;

  this.eventSymbol = null;

  this.predicate = null;

  this.priority = 0;
}

/**
 * @private
 * @class
 * Collection of event and method symbols
 */
function SymbolRegistry()
{
  this.methodSymbols = new Map();
  this.methodTypes = [];
}

/**
 * Create a factory that generates method symbols for a specific scope
 */
SymbolRegistry.prototype.createFactory = function(scopeName)
{
  scopeName = scopeName || 'scope' + (_scopeId++);

  var methodSymbols = this.methodSymbols;
  var methodTypes = this.methodTypes;

  var factory = function(eventSymbol, predicate, priority) {
    var type = new EventMethodType();

    if (!eventSymbol) {
      throw new Error('must supply an event symbol');
    }

    var s = Symbol(
      scopeName.toString() + ':' + eventSymbol.toString() + type.id);

    type.methodSymbol = s;
    type.eventFactory = factory;
    type.eventSymbol = eventSymbol;
    type.predicate = predicate || null;
    type.priority = priority || 0;

    methodSymbols.set(s, type);
    methodTypes.push(type);

    return s;
  }

  return factory;
};

