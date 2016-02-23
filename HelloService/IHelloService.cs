using System.ServiceModel;
namespace HelloService
{
    [ServiceContract(Namespace = "HelloService")]
    public interface IHelloService
    {
        [OperationContract]
        string GetMessage(string name);
    }
}