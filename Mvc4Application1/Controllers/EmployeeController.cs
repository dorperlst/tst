using MVCDemo.Models;
using System.Web.Mvc;
using System.Linq;
using System.Collections.Generic;
using System;
using BusinessLayer;


namespace MVCDemo.Controllers
{
    public class EmployeeController : Controller
    {
        //
        // GET: /Employee/

        //public ActionResult Details()
        //{
        //    Employee employee = new Employee()
        //    {
        //        EmployeeId = 101,
        //        Name = "John",
        //        Gender = "Male",
        //        City = "London"
        //    };

        //    return View(employee);
        //}
        //public ActionResult Index(int departmentId)
        //{
        //    EmployeeContext employeeContext = new EmployeeContext();
        //    List<Employee> employees = employeeContext.Employees.Where(emp => emp.DepartmentId == departmentId).ToList();

        //    return View(employees);
        //}

        BusinessLayer.EmployeeBusinessLayer employeeBusinessLayer =
              new BusinessLayer.EmployeeBusinessLayer();

        public ActionResult IndexSec()
        {
       
         List<BusinessLayer.Employee> employees = employeeBusinessLayer.Employees.ToList();
            return View(employees);
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            EmployeeBusinessLayer employeeBusinessLayer =
                   new EmployeeBusinessLayer();
            BusinessLayer.Employee employee =
                   employeeBusinessLayer.Employees.Single(emp => emp.ID == id);

            return View(employee);
        }

        

        [HttpPost]
        [ActionName("Edit")]
        // public ActionResult Edit_Post([Bind(Include = "Id, Gender, City, DateOfBirth")] BusinessLayer.Employee employee)
        //public ActionResult Edit_Post([Bind(Exclude = "Name")] Employee employee)

        public ActionResult Edit_Post(int id)
        {
            EmployeeBusinessLayer employeeBusinessLayer = new EmployeeBusinessLayer();
            BusinessLayer.Employee employee = employeeBusinessLayer.Employees.Single(x => x.ID == id);
            //UpdateModel(employee, new string[] { "ID", "Gender", "City", "DateOfBirth" });
            //UpdateModel(employee);
            //UpdateModel<IEmployee>(employee);

            if (ModelState.IsValid)
            {
                employeeBusinessLayer.SaveEmployee(employee);

                return RedirectToAction("Index");
            }

            return View(employee);
        }



        [HttpGet]
        [ActionName("Create")]
        public ActionResult Create_Get()
        {
            return View();
        }

        [HttpPost]
        [ActionName("Create")]
        public ActionResult Create_Post()
        {
            EmployeeBusinessLayer employeeBusinessLayer =
                new EmployeeBusinessLayer();

            BusinessLayer.Employee employee = new BusinessLayer.Employee();
            TryUpdateModel(employee);
            if (ModelState.IsValid)
            {
                employeeBusinessLayer.AddEmmployee(employee);
                return RedirectToAction("IndexSec");
            }
            else
            {
                return View();
            }
        }
 
        //[HttpGet]
        //public ActionResult Create()
        //{
        //    return View();
        //}


        //[HttpPost]
        //public ActionResult Create(BusinessLayer.Employee employee)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        EmployeeBusinessLayer employeeBusinessLayer =
        //            new EmployeeBusinessLayer();

        //        employeeBusinessLayer.AddEmmployee(employee);
        //        return RedirectToAction("IndexSec");
        //    }
        //    return View();
        //}

        //[HttpPost]
        //public ActionResult Create()
        //{
        //    if (ModelState.IsValid)
        //    {
        //        EmployeeBusinessLayer employeeBusinessLayer =
        //            new EmployeeBusinessLayer();

        //        BusinessLayer.Employee employee = new BusinessLayer.Employee();
        //        UpdateModel<BusinessLayer.Employee>(employee);

        //        employeeBusinessLayer.AddEmmployee(employee);
        //        return RedirectToAction("IndexSec");
        //    }
        //    return View();
        //}
        //[HttpPost]
        //public ActionResult Create(FormCollection formCollection)
        //{
        //    BusinessLayer.Employee employee = new BusinessLayer.Employee();
        //    // Retrieve form data using form collection
        //    employee.Name = formCollection["Name"];
        //    employee.Gender = formCollection["Gender"];
        //    employee.City = formCollection["City"];
        //    employee.DateOfBirth =
        //        Convert.ToDateTime(formCollection["DateOfBirth"]);

        //    EmployeeBusinessLayer employeeBusinessLayer =
        //        new EmployeeBusinessLayer();

        //    employeeBusinessLayer.AddEmmployee(employee);
        //    return RedirectToAction("IndexSec");
        //}

        [HttpPost]
        public ActionResult Delete(int id)
        {
            EmployeeBusinessLayer employeeBusinessLayer =
                new EmployeeBusinessLayer();
            employeeBusinessLayer.DeleteEmployee(id);
           //return View();
            return RedirectToAction("IndexSec");
        }


        public ActionResult Details(int id)
        {
            List<BusinessLayer.Employee> employees = employeeBusinessLayer.Employees.ToList();
            BusinessLayer.Employee employee = employees.FirstOrDefault(p => p.ID == id);

            //EmployeeContext employeeContext = new EmployeeContext();
            //Employee employee = employeeContext.Employees.FirstOrDefault(p => p.EmployeeId == id);
            
            return View(employee);
        }

    }
}
