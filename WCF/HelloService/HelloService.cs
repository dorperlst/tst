using System.ServiceModel;
namespace HelloService
{
    public class HelloService : IHelloServiceChanced
    {
       
        public string GetMessage(string name)
        {
            return "Hello " + name;
        }
    }
}