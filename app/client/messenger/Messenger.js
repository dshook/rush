module.exports = Messenger;

var SymbolRegistry = require('./SymbolRegistry.js');

var registry = Messenger.__registry = new SymbolRegistry();

/**
 * The general purpose and default event factory
 * @example
 * import {event} from 'messenger';
 * import {update} from 'game-loop';
 *
 * class T
 * {
 *   // fired every frame
 *   [ event(update) ](dt)
 *   {
 *
 *   }
 * }
 */
Messenger.event = registry.createFactory('event');

/**
 * Create an event factory that can be used to create symbolic events
 * @param {string} name Event factory name/decription
 */
Messenger.createFactory = registry.createFactory.bind(registry);

/**
 * @private
 */
function BoundEvent()
{
  this.instance = null;
  this.methodType = null;
}

/**
 * @class
 * A general high-performance Symbol-based event bus.
 */
function Messenger()
{
  // Ongoing events that count up and get reset during updates
  this._fired = this._handled = 0;

  /**
   * Number of events that have been fired since last reset.
   *
   * Counts the number of times (via {@link Messenger#trigger}) has been called
   * since the last reset. Gives an idea of how busy the event bus is.
   * @type {number}
   * @readonly
   */
  this.fired   = 0;

  /**
   * Number of event handlers that have been called since the last reset.
   *
   * Gives an idea of how many "listeners" are active and how much activity
   * results from events.
   * @type {number}
   * @readonly
   */
  this.handled = 0;

  /**
   * When this event occurs, the {@link Messenger#fired} and
   * {@link Messenger#handled} counters are reset.
   * @type {string}
   * @default null
   */
  this.resetTrigger = null;

  // map from event symbol -> bindings
  this._bindings = new Map();

  // factory -> handler
  this._handlers = new Map();
}

/**
 * Trigger an event to be fired with up to two optional parameters.
 * @param {Symbol} eventSymbol What event to fire
 * @param {object=} entity Param to pass to event handlers
 * @param {object=} option Param to pass to event handlers
 * @example
 * // With the typical entity and option/info params
 * messenger.trigger(collide, entity, other);
 *
 * // With alternative parameters
 * messenger.trigger(update, dt);
 *
 * // With no params
 * messenger.trigger(ping);
 */
Messenger.prototype.trigger = function(eventSymbol, a, b)
{
  this.scopedTrigger(null, eventSymbol, a, b);
};

/**
 * Bypass handlers to directly trigger alternative-factory events
 * @param {Function} eventFactory The event factory to scope
 * @param {Symbol} eventSymbol What event to fire
 * @param {object=} entity Param to pass to event handlers
 * @param {object=} option Param to pass to event handlers
 */
Messenger.prototype.scopedTrigger = function(eventFactory, eventSymbol, a, b)
{
  var bindings = this._getBindings(eventSymbol);

  var scoped = eventFactory !== null;

  if (eventSymbol === this.resetTrigger) {
    this._flushCounts();
  }

  this._fired++;

  for (var n = 0; n < bindings.length; n++) {
    var binding = bindings[n];
    var instance = binding.instance;
    var type = binding.methodType;
    var predicate = type.predicate;

    if (predicate && !predicate(a, b)) continue;

    var nativeEvent = type.eventFactory === Messenger.event;
    var directScope = eventFactory === type.eventFactory;

    if (directScope || (!scoped && nativeEvent)) {
      instance[type.methodSymbol](a, b);
      this._handled++;
    }
    else {
      var handler = this._handlers.get(type.eventFactory);
      if (handler) {
        handler(instance, type, a, b);
        this._handled++;
      }
    }
  }
};

/**
 * Set the handler for alternative-factory event methods
 * @param {Function} eventFactory The event factory
 * @param {Function} handler The callback to handle the event proc
 * @example
 * const specialEvent = createFactory('special event');
 *
 * ...
 *
 * messenger.setHandler(specialEvent, (instance, type, a, b) => {
 *
 *   ...
 *
 * });
 *
 * ...
 *
 * class T
 * {
 *   [ specialEvent(ping) ]()
 *   {
 *     ...
 *   }
 * }
 */
Messenger.prototype.setHandler = function(eventFactory, handler)
{
  if (this._handlers.has(eventFactory)) {
    throw new Error('cannot have more than one handler per eventFactory');
  }

  this._handlers.set(eventFactory, handler);
};

/**
 * For a given instance object, remove all events bound by the
 * {@link Messenger#bindInstance} call.
 * @param {object} instance Object instance whose methods will be unbound
 * @example
 * messenger.unbindInstance(someObj);
 */
Messenger.prototype.unbindInstance = function(instance)
{
  var iter = this._bindings[Symbol.iterator]();

  for (var n; !(n = iter.next()).done; ) {
    var item = n.value;
    //var eventSymbol = item[0];
    var bindings = item[1];

    for (var m = bindings.length - 1; m >= 0; m--) {
      var binding = bindings[m];
      if (binding.instance !== instance) continue;
      bindings.splice(m, 1);
    }
  }
};

/**
 * Bind all symbolic event methods to the event bus.
 * @param {object} instance Object instance whose methods will be bound
 * @example
 * import {event} from 'messenger';
 *
 * ...
 *
 * class MyService
 * {
 *   [ event('update') ](dt)
 *   {
 *     ...
 *   }
 * }
 *
 * ...
 *
 * var service = new MyService();
 * messenger.bindInstance(service);
 *
 * // The method above will trigger
 * messenger.trigger('update', dt);
 */
Messenger.prototype.bindInstance = function(instance)
{
  var methodTypes = registry.methodTypes;

  for (var n = 0; n < methodTypes.length; n++) {
    var type = methodTypes[n];

    if (typeof instance[type.methodSymbol] !== 'function') continue;

    var binding = new BoundEvent();
    binding.instance = instance;
    binding.methodType = type;

    var bindings = this._getBindings(type.eventSymbol);
    bindings.push(binding);
  }
};

/**
 * Get the map from event symbol -> bound events by scope
 * @private
 */
Messenger.prototype._getBindings = function(eventSymbol)
{
  var bindings = this._bindings.get(eventSymbol);

  if (!bindings) {
    bindings = [];
    this._bindings.set(eventSymbol, bindings);
  }

  return bindings;
};

/**
 * Persist ongoing event counts to public members
 * @private
 */
Messenger.prototype._flushCounts = function()
{
  this.fired = this._fired;
  this.handled = this._handled;
  this._fired = this._handled = 0;
};
