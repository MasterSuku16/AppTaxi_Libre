using App_Taxi_BackEnd.Models;
using Google.Cloud.Firestore;
using System.Linq;

namespace App_Taxi_BackEnd.Servicios
{
    public class UsersServices
    {

        FirestoreDb db = FirestoreDb.Create("test4-netcore");
       /// <returns></returns>
        // userservices()
        // {
        //    db = firestoredb.create("test4-netcore");
        // }
        internal async Task<IAsyncEnumerable<DocumentSnapshot>> GetAllUsersAsync2()
        {
            var data =await db.Collection("Users").GetSnapshotAsync();
            return data.ToAsyncEnumerable();
        }

        internal async Task<List<RegisterDTO>> GetAllUsersAsync()
        {
            QuerySnapshot querySnapshot = await db.Collection("Users").GetSnapshotAsync();
            List<RegisterDTO> usuarios = new List<RegisterDTO>();
            foreach (DocumentSnapshot queryResult in querySnapshot.Documents)
            {
                RegisterDTO user = queryResult.ConvertTo<RegisterDTO>();
                user.Id = queryResult.Id;
                usuarios.Add(user);
            }
            return usuarios;
        }

        internal async Task<Result> CreateUserAsync(RegisterDTO user)
        {
          var newDocument= await db.Collection("Users").AddAsync(user);
            return  new Result() { Title = "Usuario creado exitosamente", Data = newDocument.Id, Type = ResultType.success };
        }

        internal async  Task<string> test()
        {
            FirestoreDb db = FirestoreDb.Create("test4-netcore");

            // Create a document with a random ID in the "users" collection.
            CollectionReference collection = db.Collection("Users");
         //   DocumentReference document = await collection.AddAsync(new { Name = "JUAN PEDRO", Born = 1815 });

            //// A DocumentReference doesn't contain the data - it's just a path.
            //// Let's fetch the current document.
            //DocumentSnapshot snapshot = await document.GetSnapshotAsync();

            //// We can access individual fields by dot-separated path
            //Console.WriteLine(snapshot.GetValue<string>("Name.First"));
            //Console.WriteLine(snapshot.GetValue<string>("Name.Last"));
            //Console.WriteLine(snapshot.GetValue<int>("Born"));

            //// Or deserialize the whole document into a dictionary
            //Dictionary<string, object> data = snapshot.ToDictionary();
            //Dictionary<string, object> name = (Dictionary<string, object>)data["Name"];
            //Console.WriteLine(name["First"]);
            //Console.WriteLine(name["Last"]);

            // See the "data model" guide for more options for data handling.

            // Query the collection for all documents where doc.Born < 1900.
            //     Query query = collection.WhereLessThan("Born", 1900);
            var usuarios = new List<RegisterDTO>();
            QuerySnapshot querySnapshot = await collection.GetSnapshotAsync();
            foreach (DocumentSnapshot queryResult in querySnapshot.Documents)
            {
                string firstName = queryResult.GetValue<string>("Name");
                try
                {
                    RegisterDTO user=queryResult.ConvertTo<RegisterDTO>();
                    user.Id = queryResult.Id;
                    usuarios.Add(user);
                }
                catch (Exception ex)
                {

                    throw ex;
                }
               // string lastName = queryResult.GetValue<string>("NickName");
          //      Console.WriteLine($"{firstName} {lastName}; born {born}");
            }
            return "EXITO";
        }

       
    }
}
