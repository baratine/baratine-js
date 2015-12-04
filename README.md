# baratine-js
Baratine Java Script Library

Baratine-js is client library for invoking Baratine Services build using Baratine™. 

Baratine™ is a Java platform providing a new approach for building web services. 

A service is comprised of:

  1. Data
  2. Code
  3. A thread
  4. An API/Interface
  
The service-oriented model of Baratine simplifies creating and maintaining 
high performance web services that are distributed by design.

Querying
--------
Given a service defined as 
  
    package example;
  
    import java.io.*;
    import io.baratine.core.*;
    import test.*;
  
    @Service("public:///test")
    public class Test {
  
      public void test(String value, Result<String> result)
      {
        TestState.addText("test(" + value + ")");
    
        result.complete("test[" + value + "]");
      }
    
    }

baratine-js can make calls to the service using

    var client = new Jamp.BaratineClient("http://localhost:8086/s/pod");
    
    client.query("/test", "test", ["foo"], function(data) {
      console.log("success: " + data); // expect data === 'test[foo]'
    });
    

Streaming
---------
Giving the following service:

    package example;
  
    import java.io.*;
    import io.baratine.core.*;
    import test.*;
  
    @Service("public:///test")
    public class Test {
  
      public void helloStream(String value, ResultStream<String> result)
      {
        result.accept("hello " + value);
        result.accept("bye : " + value);
    
        result.complete();
      }
    
    }

Then your JavaScript clients can stream from your service with:

    var client = new Jamp.BaratineClient("ws://localhost:8085/s/pod");
    
    var callback = function(data) {
      console.log("received: " + data);
    };
    
    // optional
    callback.onfail = function(data) {
      console.log("error: " + data);
    };
    
    // optional
    callback.oncomplete = function() {
      console.log("completed");
    };
    
    client.stream("/test", "helloStream", ["foo"], callback);

The output would be:

    received: hello foo
    received: bye foo
    completed


Baratine Distribution
---------------------
Latest distribution of Baratine can be obtained from <http://baratine.io>
 
