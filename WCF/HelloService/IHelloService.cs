using System.ServiceModel;
namespace HelloService
{
     [ServiceContract(Name = "IHelloService")]
    public interface IHelloServiceChanced
    {
        [OperationContract]
        string GetMessage(string name);
    }
}
