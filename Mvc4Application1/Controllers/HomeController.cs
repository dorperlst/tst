using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCDemo.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        

        public ActionResult Index()
        {
            // Store the list of Countries in ViewBag.  
            ViewBag.Countries = new List<string>()
            {
                "India",
                "US",
                "UK",
                "Canada"
            };

            ViewData["YourData"] = "SomeData";
            // Finally return a view
            return View();
        }
    }
}
