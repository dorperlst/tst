
using System.ServiceModel;
namespace EmployeeService
{
    [ServiceContract]
    public interface IEmployeeService
    {
        [OperationContract]
        EmployeeInfo GetEmployee(EmployeeRequest employeeRequest);

        [OperationContract]
        void SaveEmployee(EmployeeInfo Employee);
    }
}


