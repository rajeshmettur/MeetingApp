using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using Meeting.API.Helpers;
using Meeting.API.Model;

namespace Meeting.API.Data
{
    public interface IMeetingRepository
    {
         void Add<T>(T entity) where T:class;
         void Delete<T>(T entity) where T:class;
         void Update<T>(T entity) where T:class;
         Task<bool> SaveAll();
         Task<Attendee> GetAttendee(int id);
         Task<IEnumerable<Attendee>> GetAttendees();

          Task<bool> AttendeeExists(string attendee);
    }
}