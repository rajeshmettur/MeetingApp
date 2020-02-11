using System;

namespace Meeting.API.Dtos
{
    public class MeetingDetailForDto
    {
        public int Id { get; set; }

        public string Subject { get; set; }

        public string Agenda { get; set; }

        public DateTime MeetingTime { get; set; }
        
    }
}