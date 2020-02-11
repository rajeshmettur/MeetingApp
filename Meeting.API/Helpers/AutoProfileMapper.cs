using  AutoMapper;
using Meeting.API.Dtos;
using Meeting.API.Model;

namespace Meeting.API.Helpers
{
    public class AutoProfileMapper : Profile    
    {
        public AutoProfileMapper()
        {
             CreateMap<UserForRegisterDto, User>();
             CreateMap<Attendee, AttendeeListForDto>();
             CreateMap<AttendeeDetailForDto, Attendee>();
        }
    }
}