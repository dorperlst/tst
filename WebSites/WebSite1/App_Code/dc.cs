using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for dc
/// </summary>
public class dc
{
	public dc()
	{
		//
		// TODO: Add constructor logic here
		//

	}




    public System.Collections.Generic.List<System.Linq.IGrouping<string, Person>> getPeople()
    {

        DataClassesDataContext dc = new DataClassesDataContext();

        //Sample 1 : query all customers

        var customers =
               from c in dc.Persons
               orderby c.FirstName ascending
               select c;

        //display query    result in a dataGridView
        //





        var queryLastNames =
       (from c in dc.Persons
       group c by c.PersonType into newGroup
       orderby newGroup.Key
       select newGroup).Take(5);
        return queryLastNames.ToList();
        

        //return customers.ToList();



    }
}