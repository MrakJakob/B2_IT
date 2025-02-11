using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/people")]
[ApiController]
public class PeopleController : ControllerBase
{
    private static readonly List<Person> people = new()
    {
        new Person { Name = "Janez", Age = 25, Id = 1, Server = true },
        new Person { Name = "Micka", Age = 24, Id = 2, Server = true },
        new Person { Name = "Polde", Age = 27, Id = 3, Server = true },
    };

    [HttpGet]
    public ActionResult<object> Get() => people;

    [HttpPost]
    public ActionResult<object> Post([FromBody] Person newPerson)
    {
        // add new person to the start of the list
        people.Insert(0, newPerson);
        // people.Add(newPerson);
        return people;
    }

    [HttpDelete("{id}")]
    public ActionResult<object> Delete([FromRoute] int id)
    {
        var person = people.Find(p => p.Id == id);
        if (person == null)
        {
            return NotFound(new { message = $"Person with ID {id} not found." });
        }
        
        people.Remove(person);
        return people;
    }
}

public class Person
{
    public required string Name { get; set; }
    public required int Age { get; set; }
    public required int Id { get; set; }
    public bool Server { get; set; }
}
