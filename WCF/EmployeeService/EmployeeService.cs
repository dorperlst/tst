using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
namespace EmployeeService
{
    public class EmployeeService : IEmployeeService
    {
        public EmployeeInfo GetEmployee(EmployeeRequest employeeRequest)
        {
            Console.WriteLine("License Key = " + employeeRequest.LicenseKey);
            Employee employee = null;
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("spGetEmployee", con);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter parameterId = new SqlParameter();
                parameterId.ParameterName = "@Id";
                parameterId.Value = employeeRequest.EmployeeId;
                cmd.Parameters.Add(parameterId);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    if ((EmployeeType)reader["EmployeeType"] == EmployeeType.FullTimeEmployee)
                    {
                        employee = new Employee
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            Name = reader["Name"].ToString(),
                            Gender = reader["Gender"].ToString(),
                            DateOfBirth = Convert.ToDateTime(reader["DateOfBirth"]),
                            Type = EmployeeType.FullTimeEmployee,
                            //AnnualSalary = Convert.ToInt32(reader["AnnualSalary"])
                        };
                    }
                    else
                    {
                        employee = new Employee
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            Name = reader["Name"].ToString(),
                            Gender = reader["Gender"].ToString(),
                            DateOfBirth = Convert.ToDateTime(reader["DateOfBirth"]),
                            Type = EmployeeType.PartTimeEmployee,
                            //HourlyPay = Convert.ToInt32(reader["HourlyPay"]),
                            //HoursWorked = Convert.ToInt32(reader["HoursWorked"]),
                        };
                    }
                }
            }
            return new EmployeeInfo(employee);
        }

        public void SaveEmployee(EmployeeInfo employee)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("spSaveEmployee", con);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter parameterId = new SqlParameter
                {
                    ParameterName = "@Id",
                    Value = employee.ID
                };
                cmd.Parameters.Add(parameterId);

                SqlParameter parameterName = new SqlParameter
                {
                    ParameterName = "@Name",
                    Value = employee.Name
                };
                cmd.Parameters.Add(parameterName);

                SqlParameter parameterGender = new SqlParameter
                {
                    ParameterName = "@Gender",
                    Value = employee.Gender
                };
                cmd.Parameters.Add(parameterGender);

                SqlParameter parameterDateOfBirth = new SqlParameter
                {
                    ParameterName = "@DateOfBirth",
                    Value = employee.DOB
                };
                cmd.Parameters.Add(parameterDateOfBirth);

                SqlParameter parameterEmployeeType = new SqlParameter
                {
                    ParameterName = "@EmployeeType",
                    Value = employee.Type
                };
                cmd.Parameters.Add(parameterEmployeeType);

                if (employee.Type == EmployeeType.FullTimeEmployee)
                {
                    SqlParameter parameterAnnualSalary = new SqlParameter
                    {
                        ParameterName = "@AnnualSalary",
                        Value = employee.AnnualSalary
                    };
                    cmd.Parameters.Add(parameterAnnualSalary);
                }
                else
                {
                    SqlParameter parameterHourlyPay = new SqlParameter
                    {
                        ParameterName = "@HourlyPay",
                        Value = employee.HourlyPay,
                    };
                    cmd.Parameters.Add(parameterHourlyPay);

                    SqlParameter parameterHoursWorked = new SqlParameter
                    {
                        ParameterName = "@HoursWorked",
                        Value = employee.HoursWorked
                    };
                    cmd.Parameters.Add(parameterHoursWorked);
                }

                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}
