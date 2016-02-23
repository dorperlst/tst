using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Details
/// </summary>
public class Details
{
    public string Started = string.Empty, Id = string.Empty;
}
public class Cities
{
    public string Name = string.Empty, Id = string.Empty;
}

abstract class Shape
{
    public abstract double GetArea();
    public double Area() { return 2.2; }
    public int Id { get; private set; }
    public int Age { get; internal set; }
}

class MyBaseClass
{
    public virtual string Name { get; set; }
    private int num;
    public virtual int Number
    {
        get { return num; }
        set { num = value; }
    }
}

class MyDerivedClass : MyBaseClass
{
    private string name;

    public override string Name
    {
        get
        {
            return name;
        }
        set
        {
            if (value != String.Empty)
            {
                name = value;
            }
            else
            {
                name = "Unknown";
            }
        }
    }

}
class Circle : Shape
{
    public double Radius { get; set; }

    public override double GetArea()
    {
        double t = Area();
        return Math.PI * Radius * Radius;
    }
}