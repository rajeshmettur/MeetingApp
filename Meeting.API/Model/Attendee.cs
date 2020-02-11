using System.Collections.Generic;

namespace Meeting.API.Model
{
    public class Attendee
    {
        public int Id { get; set; }
        public string AttendeeName { get; set; }
        public ICollection<MeetingEntity> Meetings { get; set; }
    }
}