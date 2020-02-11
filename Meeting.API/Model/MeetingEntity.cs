using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Meeting.API.Model
{
    [DisplayName("Meeting")]
    public class MeetingEntity
    {
        [Key]
        public int Id { get; set; }

        public string Subject { get; set; }

        public string Agenda { get; set; }

        public DateTime MeetingTime { get; set; }

        public Attendee Attendee { get; set; }

        public int? AttendeeId { get; set; }

      
    }
}