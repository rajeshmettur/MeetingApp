using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Meeting.API.Helpers;
using Meeting.API.Model;
using Microsoft.EntityFrameworkCore;

namespace Meeting.API.Data
{
    public class MeetingRepository : IMeetingRepository
    {

        private readonly DataContext _context;

        public MeetingRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
             _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public async Task<bool> SaveAll()
        {
             return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Attendee> GetAttendee(int id)
        {
           var attendee = await _context.Attendees.FirstOrDefaultAsync(u => u.Id == id);
           return attendee;
        }

        public async Task<IEnumerable<Attendee>> GetAttendees()
        {
            var attendees = await _context.Attendees.OrderBy(u => u.AttendeeName).ToListAsync();
            return attendees;
        }
       
        public async Task<bool> AttendeeExists(string attendee)
        {
           if(await _context.Attendees.AnyAsync(x=>x.AttendeeName == attendee))
           return true;

           return false;
        }
    }
}