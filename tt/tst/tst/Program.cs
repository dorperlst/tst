using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace tst
{
    class tstTst
    {
        public void parallel()
        {
            List<int> intList = new List<int> { 2, 5, 8, 3, 45, 54, 33, 32, 22, 23, 11, 76, 45, 26, 21, 15, 16, 25 };
            //Parallel.ForEach(intList, (i => doSomeWork(i, i)));//(i => Console.WriteLine(i)));
            //Parallel.For(1,100, (i => Console.WriteLine(i)));
            //var t = Task.Factory.StartNew(intList, (i) => doSomeWork(i, 1000));
            //Task t1 = new Task(() => doSomeWork(1,1000 ));
            //Task t22 = new Task(() => doSomeWork(2,1000 ));
            Task t1 = Task.Factory.StartNew(() => doSomeWork(1, 1000));
            Task t22 = Task.Factory.StartNew(() => doSomeWork(2, 1000));
            List<Task> taskList = new List<Task> { t1, t22 };
            //Task t2 = Task.Factory.StartNew(() => doSomeWork(21, 1000)).ContinueWith((i) => doSomeOtherWork(234, 1000));
            Task.WaitAll(taskList.ToArray());


            //var t1 = new Task(() => { Console.WriteLine("task begining  "); });
            Console.ReadKey();
        }

        public void doSomeWork(int id, int sleepTime)
        {
            Console.WriteLine("task begining id =" + id.ToString());
            Thread.Sleep(sleepTime);
            Console.WriteLine("task completed id =" + id.ToString());
        }

        public void doSomeOtherWork(int id, int sleepTime)
        {
            Console.WriteLine("task begining id =" + id.ToString());
            Thread.Sleep(sleepTime);
            Console.WriteLine("task completed id =" + id.ToString());
        }
    }
    class Program
    {
       

        static void Main(string[] args)
        {
            tstTst t = new tstTst();
            t.parallel();
        }
    }
}
