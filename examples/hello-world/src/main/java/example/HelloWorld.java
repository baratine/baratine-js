package example;

import io.baratine.core.Result;
import io.baratine.core.Service;

@Service("public:///hello-world")
public class HelloWorld
{
  public void hello(Result<String> result)
  {
    result.complete("Hello World!");
  }
}