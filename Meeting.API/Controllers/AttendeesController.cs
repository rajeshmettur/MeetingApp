using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using AutoMapper;
using Meeting.API.Data;
using Meeting.API.Dtos;
using Meeting.API.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Meeting.API.Model;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;

namespace Meeting.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AttendeesController : ControllerBase
    {
        private readonly IMeetingRepository _repo;
        private readonly IMapper _mapper;

        public AttendeesController(IMeetingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }


        [AllowAnonymous]
        // GET api/Attendees/id
        [HttpGet("{id}",  Name = "GetAttendee")]
        public async Task<IActionResult> GetAttendee(int id)
        {
            var attendee = await _repo.GetAttendee(id);
            var attendeeToReturn = _mapper.Map<AttendeeListForDto>(attendee);
            return Ok(attendeeToReturn);
        }
        
        [AllowAnonymous]
         // GET api/Attendees
        [HttpGet]
        public async Task<IActionResult> GetAllAttendees()
        {
            var attendees = await _repo.GetAttendees();
            var attendeeResult = _mapper.Map<IEnumerable<AttendeeListForDto>>(attendees);
            return Ok(attendeeResult);
        }

        [AllowAnonymous]
        //POST - CREATE
        [HttpPost("create")]
        public async Task<IActionResult> Create(AttendeeDetailForDto attendeeForCreateDto)
        {
            //validate request 

            attendeeForCreateDto.AttendeeName = attendeeForCreateDto.AttendeeName.ToLower();

            if (await _repo.AttendeeExists(attendeeForCreateDto.AttendeeName))
                return BadRequest("Attendee already exists");

            var attendeeToCreate = _mapper.Map<Attendee>(attendeeForCreateDto);

            _repo.Add(attendeeToCreate);

            if(await _repo.SaveAll())
            {
                //return Ok();
                var attendeeToReturn = _mapper.Map<Attendee>(attendeeToCreate);
                return CreatedAtRoute("GetAttendee", new { controller = "Attendees", id = attendeeToCreate.Id },
                attendeeToReturn);
            }

             return BadRequest("Could not add the Attendee");
        }

          [AllowAnonymous]
          [HttpPut("{id}", Name ="update")]
            public async Task<IActionResult> Update(int id, [FromBody]AttendeeDetailForDto attendeeForUpdateDto)
            {
                var attendeeFromRepo = await _repo.GetAttendee(id);

                if(attendeeFromRepo == null)
                    return BadRequest("Could not find the Attendee");

                _mapper.Map(attendeeForUpdateDto, attendeeFromRepo);

                _repo.Update(attendeeFromRepo);
                
                await _repo.SaveAll();
                    
                return NoContent();

                throw new Exception($"Updating attendee {id} failed on save");
            }

        [AllowAnonymous]
        [HttpDelete("{id}", Name="delete")]
        public async Task<IActionResult> DeleteAttendee(int id)
        {
            var attendeeFromRepo = await _repo.GetAttendee(id);

            if(attendeeFromRepo == null)
                return BadRequest("Could not find the Attendee");

            _repo.Delete(attendeeFromRepo);

            if(await _repo.SaveAll())
               return Ok();

            return BadRequest("Failed to delete the photo");
        }
    }
}