using System.ComponentModel.DataAnnotations;

namespace Meeting.API.Dtos
{
    public class AttendeeDetailForDto
    {
         [Required]
         public string AttendeeName { get; set; }
    }
}