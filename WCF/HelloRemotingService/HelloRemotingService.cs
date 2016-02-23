using System;
namespace HelloRemotingService
{
    public class HelloRemotingService : MarshalByRefObject,
        IHelloRemotingService.IHelloRemtingService
    {
        public string GetMessage(string name)
        {
            return "Hello " + name;
        }
    }
}