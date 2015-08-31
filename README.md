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
    
    
Latest distribution of Baratine can be obtained from <http://baratine.io>
 
