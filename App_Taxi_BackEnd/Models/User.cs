using Google.Cloud.Firestore;

namespace App_Taxi_BackEnd.Models
{
    [FirestoreData]
    public class User
    {
        [FirestoreProperty]
        public string Id { get; set; } = "";

        [FirestoreProperty]
        public string Name { get; set; } = "";

        [FirestoreProperty]
        public string Password { get; set; } = "";

        [FirestoreProperty]
        public string Email { get; set; } = "";

        [FirestoreProperty]
        public string ProfilePicture{ get; set; } = "";
    }
}
