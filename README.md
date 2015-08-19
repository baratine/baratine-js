# baratine-js
Baratine Java Script Library

Baratine-js is client library for invoking Baratine Services build using Baratine™. 

Baratine is a new distributed in-memory Java service platform for building high 
performance web services that combine both data and logic in the same JVM.
 
Given a service defined as 
  
    package qa;
  
    import java.io.*;
    import io.baratine.core.*;
    import test.*;
  
    @Service("public:///test")
    public class Test {
  
      public String test(String value)
      {
        TestState.addText("test(" + value + ")");
    
        return "test[" + value + "]";
      }
    
    }

baratine-js can make calls to the service using

    var client = new Jamp.BaratineClient("http://localhost:8086/s/pod");
    
    client.query("/test", "test", ["foo"], function(data) {
      console.log("success: " + data); // expect data === 'test[foo]'
    });
    
    
Latest distribution of Baratine can be obtained from <http://baratine.io>
 
