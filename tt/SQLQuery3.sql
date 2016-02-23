SELECT
    SalesOrderID,
    SalesOrderNumber,
    CustomerID,
    ROW_NUMBER() OVER(ORDER BY CustomerID) AS RowNumber,
    RANK() OVER(ORDER BY CustomerID) AS [Rank],
    DENSE_RANK() OVER(ORDER BY CustomerID) AS DenseRank,
    NTILE(5000) OVER(ORDER BY CustomerID) AS NTile5000
FROM Sales.SalesOrderHeader
ORDER BY CustomerID  



SELECT TerritoryName, ROW_NUMBER() OVER(PARTITION BY TerritoryName ORDER BY SalesYTD DESC) AS Row
FROM Sales.vSalesPerson
WHERE TerritoryName IS NOT NULL AND SalesYTD <> 0
ORDER BY TerritoryName;

SELECT ListPrice
FROM Production.Product
ORDER BY ListPrice DESC
OFFSET 100 ROWS FETCH NEXT 25 ROWS ONLY

SELECT *
FROM Production.Product
WHERE ListPrice BETWEEN 100 AND 200

SELECT
    CustomerID,
    COUNT(*)    AS NoOfOrders,
    AVG(SubTotal)    AS AverageSubTotal,
    MAX(SubTotal)    AS MaxSubTotal,
    MIN(SubTotal)    AS MinSubTotal,
    SUM(SubTotal)    AS TotalSubTotal
FROM Sales.SalesOrderHeader
GROUP BY CustomerID 


SELECT
    CustomerID,
    SalesPersonID,
    COUNT(*) AS NoOfOrders
FROM Sales.SalesOrderHeader
GROUP BY GROUPING SETS
(
    (CustomerID            ),
    (SalesPersonID            ),
    (CustomerID, SalesPersonID    ),
    (                )
)
ORDER BY SalesPersonID,
    CustomerID  


	SELECT
    SalesOrderID,
    SalesOrderNumber,
    CustomerID,
    ROW_NUMBER() OVER(partition by CustomerID ORDER BY CustomerID) AS RowNumber,
    RANK() OVER(ORDER BY CustomerID) AS [Rank],
    DENSE_RANK() OVER(ORDER BY CustomerID) AS DenseRank,
    NTILE(5000) OVER(ORDER BY CustomerID) AS NTile5000
FROM Sales.SalesOrderHeader
ORDER BY CustomerID  


USE AdventureWorks2012;
GO
CREATE PROCEDURE HumanResources.uspGetEmployeesTest2 
    @LastName nvarchar(50), 
    @FirstName nvarchar(50) 
AS 

    SET NOCOUNT ON;
    SELECT FirstName, LastName, Department
    FROM HumanResources.vEmployeeDepartmentHistory
    WHERE FirstName = @FirstName AND LastName = @LastName
    AND EndDate IS NULL;
GO

WITH CTE AS
(
    SELECT
        BusinessEntityID,
        Title,
        FirstName,
        LastName
    FROM Person.Person
)
SELECT  * FROM CTE  