using System;
namespace HelloServiceHost
{
    class Program
    {
        static void Main()
        {
            using (System.ServiceModel.ServiceHost host = new
                System.ServiceModel.ServiceHost(typeof(HelloService.IHelloServiceChanced)))
            {
                host.Open();
                Console.WriteLine("Host started @ " + DateTime.Now.ToString());
                Console.ReadLine();
            }
        }
    }
}
