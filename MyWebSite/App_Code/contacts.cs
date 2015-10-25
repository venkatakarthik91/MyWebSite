using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for contacts
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class contacts : System.Web.Services.WebService
{

    public contacts()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public void InsertIntoContacts(string name, string email, string message)
    {
        
        string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["KarthikDBConnString"].ConnectionString;
        MySqlConnection connection = new MySqlConnection(connectionString);
        MySqlCommand cmd = new MySqlCommand("Insert into contacts values(@name , @email , @message)");
        cmd.Connection = connection;
        cmd.CommandType = System.Data.CommandType.Text;
        cmd.Parameters.AddWithValue("@name", name);
        cmd.Parameters.AddWithValue("@email", email);
        cmd.Parameters.AddWithValue("@message", message);
        connection.Open();
        cmd.ExecuteNonQuery();
        connection.Close();
    }

}
