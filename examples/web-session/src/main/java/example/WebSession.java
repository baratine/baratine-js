package example;

import io.baratine.core.CancelHandle;
import io.baratine.core.OnInit;
import io.baratine.core.Result;
import io.baratine.core.Service;
import io.baratine.core.ServiceManager;
import io.baratine.timer.TimerService;

import java.util.Date;
import java.util.concurrent.TimeUnit;

@Service("session://pod/session")
public class WebSession
{
  private TimerService _timerService;

  @OnInit
  public void init()
  {
    _timerService
      = ServiceManager.current().lookup("timer:///").as(TimerService.class);
  }

  public void registerListener(@Service EventListener listener)
  {
    System.out.println("WebSession.registerListener " + listener);

    listener.onEvent(new Date().toString());
    _timerService.runEvery(c -> listener.onEvent(new Date().toString()),
                           1,
                           TimeUnit.SECONDS,
                           Result.<CancelHandle>ignore());
  }
}

