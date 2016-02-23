using System.Web.Services;
namespace WebServicesDemo2
{
    [WebService]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class HelloWebService : System.Web.Services.WebService
    {
        [WebMethod]
        public string GetMessage(string name)
        {
            return "Hello " + name;
        }
    }
}