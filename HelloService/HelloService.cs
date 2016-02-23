namespace HelloService
{
    public class HelloService : IHelloService
    {
        public string GetMessage(string name)
        {
            return "Hello " + name;
        }
    }
}