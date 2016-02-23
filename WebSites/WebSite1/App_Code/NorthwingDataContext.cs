using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for NorthwingDataContext
/// </summary>
public class NorthwingDataContext
{

    DataClasses2DataContext ndc = new DataClasses2DataContext();


	public NorthwingDataContext()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    public List<Customer>  GetCustomerList()
    {
        var  waCustomers =
           from c in ndc.Customers
           where c.Region == "WA"
           select c;

        return waCustomers.ToList();
    }


}