using Google.Cloud.Firestore;

namespace App_Taxi_BackEnd.Models
{
    public class RegisterDTO
    {
        public string Id { get; set; } = "";

        public string Name { get; set; } = "";

        public string Password { get; set; } = "";

        public string Email { get; set; } = "";

        public string ProfilePicture { get; set; } = "";
       
        public User ToUser()
        {
            return new User()
            {
                Email = this.Email,
                Id = this.Id,
                Name = this.Name,
                Password = this.Password,
                ProfilePicture = this.ProfilePicture
            };
        }

    }
}
