using Meeting.API.Model;
using Microsoft.EntityFrameworkCore;

namespace Meeting.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Value> Values { get; set; }

        public DbSet<Attendee> Attendees { get; set; }

        public DbSet<MeetingEntity> Meetings {get; set; }
    }
}   