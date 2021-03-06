var Jamp = {};

Jamp.BaratineClient = function (url, rpc)
{
  this.client = new Jamp.Client(url, rpc);

  this.onSession;

  var _this = this;

  this.client.onOpen = function() {
    if (_this.onSession !== undefined)
      _this.onSession();
  };

  return this;
};

/**
 * Invokes a method on a Baratine service. Doesn't request a result from a method.
 * Should be used with method that specify no return value.
 *
 * @param service - url of the service (value specified in @Service("/url")
 * annotation on the service class.
 * @param method – method to invoke e.g. 'test' for method defined as 'public void test(String value)'
 * @param args – array of arguments to pass to the method e.g. ["hello world"]
 * @param headers – optional headers
 */
Jamp.BaratineClient.prototype.send = function (service, method, args, headers)
{
  this.client.send(service, method, args, headers);
};

/**
 * Invokes a method on a Baratine service and expects a result.
 *
 * Should be used with methods that specify a return value via io.baratine.core.Result
 * e.g public void test(String in, Result<String> out);
 * or as a return type of a method e.g. public String test(String in);
 *
 * @param service - url of the service (value specified in @Service("/url")
 * annotation on the service class.
 * @param method – method to invoke e.g. 'test' for method defined as 'public void test(String in, Result<String> out)'
 * @param args – array of arguments to pass to the method e.g. ["hello world"]
 * @param callback - method that accepts a reply e.g. function(data) {Console.log(data);}
 * @param headers - optional headers
 */
Jamp.BaratineClient.prototype.query = function (service,
                                                method,
                                                args,
                                                callback,
                                                headers)
{
  this.client.query(service, method, args, callback, headers);
};

/**
 * Invokes a stream method on a Baratine service and expects a result.
 *
 * Should be used with methods that specify a return value via io.baratine.core.ResultStream.
 *
 * @param service - url of the service (value specified in @Service("/url")
 * annotation on the service class.
 * @param method – method to invoke e.g. 'test' for method defined as 'public void test(String in, ResultStream<String> result)'
 * @param args – array of arguments to pass to the method e.g. ["hello world"]
 * @param callback - method that accepts a reply e.g. function(data) {Console.log(data);}
 * @param headers - optional headers
 */
Jamp.BaratineClient.prototype.stream = function (service,
                                                 method,
                                                 args,
                                                 callback,
                                                 headers)
{
  this.client.stream(service, method, args, callback, headers);
};

/**
 * Advanced: Used with child Baratine Services and returnes a Proxy to a remote
 * service which can be invoked using method names defined on the service.
 *
 * @param path
 * @returns {Jamp.BaratineClientProxy}
 */
Jamp.BaratineClient.prototype.lookup = function (path)
{
  var target = new Jamp.BaratineClientProxy(this, path);

  try {
    if (Proxy !== undefined)
      try {
        target = Proxy.create(handlerMaker(target));
      } catch (err) {
        console.log(err);
      }
  } catch (err) {
  }

  return target;
};

/**
 * Creates a listener that can be used to receive events generated by a Baratine Service.
 *
 * @see listener example for explanation
 *
 * @returns {Jamp.ServiceListener}
 */
Jamp.BaratineClient.prototype.createListener = function ()
{
  return new Jamp.ServiceListener();
};

Jamp.BaratineClient.prototype.close = function () {
  this.client.close();
};

Jamp.BaratineClient.prototype.toString = function ()
{
  return "BaratineClient[" + this.client + "]";
};

Jamp.BaratineClientProxy = function (client, path)
{
  this.client = client;
  this.path = path;

  return this;
};

Jamp.BaratineClientProxy.prototype.$send = function (method, args, headers)
{
  this.client.send(this.path, method, args, headers);
};

Jamp.BaratineClientProxy.prototype.$query = function (method,
                                                      args,
                                                      callback,
                                                      headers)
{
  this.client.query(this.path, method, args, callback, headers);
};

Jamp.BaratineClientProxy.prototype.$lookup = function (path)
{
  var target = new Jamp.BaratineClientProxy(this.client, this.path + path);

  try {
    if (Proxy !== undefined)
      try {
        target = Proxy.create(handlerMaker(target));
      } catch (err) {
        console.log(err);
      }
  } catch (err) {
  }

  return target;
};

Jamp.BaratineClientProxy.prototype.toString = function ()
{
  return "Jamp.BaratineClientProxy[" + this.path + "]";
};

Jamp.ServiceListener = function ()
{
  this.___isListener = true;

  return this;
};

Jamp.formatLog = function(msg)
{
  return new Date().toISOString() + ': ' + msg;
};

