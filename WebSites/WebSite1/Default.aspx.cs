using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
       
        //linqcontexFunction();
        //linqProcedure();
        GridView1.DataSource = Linq5();
        GridView1.DataBind();
        Label1.Text = GridView1.Rows.Count.ToString();
    }
 
    public IEnumerable<double> Linq5()
    {
        DataClasses2DataContext ndc = new DataClasses2DataContext();

        int[] numbers333 = { 1, 11, 3, 19, 41, 65, 19 }; 
  
        bool onlyOdd = numbers333.All(n => n % 2 == 1);

        var categories =
      from p in ndc.Products
      group p by p.Category into g
      select new { Category = g.Key, MostExpensivePrice = g.Max(p => p.UnitPrice) }; 
  
        foreach (var t in categories)
        {


        }
        int[] vectorA = { 0, 2, 4, 5, 6 };
        int[] vectorB = { 1, 3, 5, 7, 8 };

        //int dotProduct = vectorA.Combine(vectorB, (a, b) => a * b).Sum(); 
     
        var numbers3 =
        from n in Enumerable.Range(100, 50)

        select new { Number = n, OddEven = n % 2 == 1 ? "odd" : "even" };
        var numbers33 =   Enumerable.Repeat(7, 10);

        var productFirstChars =
        (from p in ndc.Products
        select p.ProductName).FirstOrDefault();
        Product product789 = ndc.Products.FirstOrDefault(p => p.ProductID == 789);
        
        int[] numbers = { 5, 4, 1, 3, 9, 8, 6, 7, 2, 0 };

        int fourthLowNum = (
            from n in numbers
            where n > 5
            select n)
            .ElementAt(1);
        object[] numbers2 = { null, 1.0, "two", 3, "four", 5, "six", 7.0 };

        var doubles = numbers2.OfType<double>();

        return doubles.ToList();
    }

    private static IEnumerable<int> unionIntersectExist(DataClasses2DataContext ndc)
    {
        int[] numbersA = { 0, 2, 4, 5, 6, 8, 9 };
        int[] numbersB = { 1, 3, 5, 7, 8 };
        System.Collections.Generic.IEnumerable<int> uniqueNumbers = numbersA.Union(numbersB);


        var productFirstChars =
        from p in ndc.Products
        select p.ProductName;
        var customerFirstChars =
            from c in ndc.Customers
            select c.CompanyName;

        var uniqueFirstChars = productFirstChars.Union(customerFirstChars);

        var productFirstChars2 =
          (from p in ndc.Products
           select p.ProductName).Union(
          from c in ndc.Customers
          select c.CompanyName
          );


        //This sample uses Intersect to create one sequence that contains the common values shared by both arrays.
        var commonNumbers = numbersA.Intersect(numbersB);

        var commonFirstChars = productFirstChars.Intersect(customerFirstChars);



        IEnumerable<int> aOnlyNumbers = numbersA.Except(numbersB);
        var commonFirstChars1 = productFirstChars.Except(customerFirstChars);
        return aOnlyNumbers;
    }

    private static IEnumerable<object> groupdistinct(DataClasses2DataContext ndc)
    {


        var orderGroups =
            from p in ndc.Products
            group p by p.SupplierID into g
            from p in g
            select new { SupplierID = p.SupplierID, p.ProductID };

        var orderGroups1 =
           (from c in ndc.Categories
            join p in ndc.Products on c equals p.Category into ps
            from r in ps
            group r by r.SupplierID into g
            from p in g
            select new { SupplierID = p.SupplierID, p.ProductID, p.CategoryID }).Distinct();





        //select new { SupplierID = g.Key };


        //orderGroups =
        //from p in ndc.Products
        //group p by p.SupplierID into g
        //from p in g
        //select new { SupplierID = g.Key, p.ProductID };


        //var orderGroups2 =
        //    from p in ndc.Products
        //    group p by p.Category into g
        //    select new { Category2 = g.Key, Products = g };

        //List< List<string>> li = new List<List<string>>();
        //List<List<Product>> li22 = new List<List<Product>>();




        return orderGroups1.ToList();
    }

    private static void REVERSE(DataClasses2DataContext ndc)
    {

        int[] numbers = { 5, 4, 1, 3, 9, 8, 6, 7, 2, 0 };

        var numsInPlace = numbers.Select((num, index) => new { Num = num, InPlace = (num == index) });
        var numsInPlace2 = ndc.Customers.SelectMany((cust, custIndex) => cust.CustomerID.StartsWith("A") ? cust.CustomerID : "");
        var firstSmallNumbers = numbers.TakeWhile((n, custIndex) => n >= custIndex);


        string[] digits = { "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" };

        var reversedIDigits = (
            from d in digits
            where d[1] == 'i'
            select d)
            .Reverse();
    }

    private static void sort()
    {
        string[] words = { "aPPLE", "AbAcUs", "bRaNcH", "BlUeBeRrY", "ClOvEr", "cHeRry" };

        var sortedWords =
            words.OrderBy(a => a.Length)
                 .ThenBy(a => a);
    }

    private static IEnumerable<object> skipTake(DataClasses2DataContext ndc)
    {
        var waOrders =

        from c in ndc.Customers

        from o in c.Orders

        where c.Region == "WA"

        select new { c.CustomerID, o.OrderID, o.OrderDate };



        var allButFirst2Orders = waOrders.Skip(2);

         int[] numbers = { 5, 4, 1, 3, 9, 8, 6, 7, 2, 0 };
         var allButFirst3Numbers = numbers.SkipWhile(n => n % 3 != 0);
         var laterNumbers = numbers.SkipWhile((n, index) => n >= index);

         var firstNumbersLessThan6 = numbers.TakeWhile(n => n < 6);
        return allButFirst2Orders.ToList();
    }

    private static IEnumerable<object> leftjoin(DataClasses2DataContext ndc)
    {
   var q =
    from c in ndc.Categories
    join p in ndc.Products on c equals p.Category into ps
    from p in ps.DefaultIfEmpty()
    select new { Category = c, ProductName = p == null ? "(No products)" : p.ProductName };


        var q2 =
          from c in ndc.Categories
          join p in ndc.Products on c equals p.Category into ps
           from p in ps.DefaultIfEmpty()
           select new {p.ProductID, Category = c, ProductName = p == null ? "(No products)" : p.ProductName };


    
        var qq =
    from p in ndc.Products
    join c in ndc.Categories on p.UnitsInStock equals c.tt into ps
    from cc in ps.DefaultIfEmpty()
    orderby p.ProductID
    select new
    {
        CategoryId = cc.CategoryID == null ? 0 : cc.CategoryID,
        CategoryName = cc.CategoryName == null ? "" : cc.CategoryName,

        tt = cc.tt == null ? 0 : cc.tt,

        ProductName = p.ProductName,
        Product = p.ProductID == null ? 0 : p.ProductID,
        UnitsInStock = p.UnitsInStock == null ? 0 : p.UnitsInStock
    };

        return qq.ToList();
    }
   
  


    private void linqcontexFunction()
    {




        DataClasses2DataContext ndc = new DataClasses2DataContext();
        var orders =
        from c in ndc.Customers
        join o in ndc.Orders on c.CustomerID equals o.CustomerID into prodGroup

        from prod2 in prodGroup
        where prod2.OrderDate >= new DateTime(1998, 1, 1)
        select new { prod2.CustomerID, prod2.OrderID, prod2.OrderDate };



        var orders2 =
             from c in ndc.Customers
             from o in c.Orders
             where o.OrderDate >= new DateTime(1998, 1, 1)
             select new { c.CustomerID, o.OrderID, o.OrderDate };

        dc dcc = new dc();
        var queryLastNames = dcc.getPeople();


        foreach (var nameGroup in queryLastNames)
        {
            Console.WriteLine("Key: {0}", nameGroup.Key);
            foreach (var student in nameGroup)
            {
                Label1.Text += " " + string.Format("\t{0}, {1}", student.LastName, student.FirstName);
            }
        }
    }


    public void linqProcedure()
    {
        DataClassesDataContext dbContext = new DataClassesDataContext();
        GridView1.DataSource = dbContext.tst(5);
        GridView1.DataBind();
    }

    public void linqActions()
    {
        DataClassesDataContext dbContext = new DataClassesDataContext();

        //Insert using LINQ to SQL

        Person newEmployee = new Person { FirstName = "Tim", LastName = "T", PersonType = "EM" };
        dbContext.Persons.InsertOnSubmit(newEmployee);
        dbContext.SubmitChanges();


        //Update using LINQ to SQL

        Person employee = dbContext.Persons.SingleOrDefault(x => x.FirstName == "Terri");
        employee.Suffix = "65000";
        dbContext.SubmitChanges();


        //Delete using LINQ to SQL

        var employee2 = dbContext.Persons.SingleOrDefault(x =>x.FirstName == "Terri");
        dbContext.Persons.DeleteOnSubmit(employee2);
        dbContext.SubmitChanges();

        DataClassesDataContext dc = new DataClassesDataContext();
        var deleteOrderDetails =
            from c in dc.Persons
            where c.FirstName == "Terri"
            select c;

        foreach (var detail in deleteOrderDetails)
        {
            dc.Persons.DeleteOnSubmit(detail);
        }
       
        
        try
        {
            dc.SubmitChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            // Provide for exceptions.
        }
            }


    protected void Button1_Click(object sender, EventArgs e)
    {
        DataClassesDataContext dbContext = new DataClassesDataContext();
        //dc.Persons.UpdatePerson();

        //Person employee2 = dbContext.Persons.SingleOrDefault(x => x.FirstName == "Terri");

        dbContext.UpdatePerson("Terri", "Terri", 5);

    }
}