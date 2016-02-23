using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;

 
public class Singleton
{
    private static volatile Singleton instance;
    private static object syncRoot = new Object();
    public List<User> users { get; set; }

    private Singleton()
    {
        users = new List<User>();
    }

    public void addUser(string userName, string userPaswword)
    {
        users.Add(new User(userName, userPaswword));
    }

    public static Singleton Instance
    {
        get
        {
            if (instance == null)
            {
                lock (syncRoot)
                {
                    if (instance == null)
                        instance = new Singleton();
                }
            }
            return instance;
        }
    }

    public class User
    {
        public string userName { get; set; }
        public string userPassword { get; set; }

        public User(string userName, string userPassword)
        {
            this.userName = userName;
            this.userPassword = userPassword;
        }
    }
}

