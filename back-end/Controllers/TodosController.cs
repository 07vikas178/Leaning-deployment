using back_end.Data;
using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController(AppDbContext dbContext) : ControllerBase
{
    // GET /api/todos returns every todo from the database.
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
    {
        return await dbContext.Todos.OrderBy(todo => todo.Id).ToListAsync();
    }

    // POST /api/todos saves a new todo and returns it to the frontend.
    [HttpPost]
    public async Task<ActionResult<Todo>> CreateTodo(Todo todo)
    {
        todo.Id = 0;
        todo.IsCompleted = false;
        dbContext.Todos.Add(todo);
        await dbContext.SaveChangesAsync();
        return Ok(todo);
    }

    // PUT /api/todos/{id} updates a todo's title and completed status.
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateTodo(int id, Todo updatedTodo)
    {
        var todo = await dbContext.Todos.FindAsync(id);
        if (todo is null)
        {
            return NotFound();
        }

        todo.Title = updatedTodo.Title;
        todo.IsCompleted = updatedTodo.IsCompleted;
        await dbContext.SaveChangesAsync();
        return NoContent();
    }

    // DELETE /api/todos/{id} removes the matching todo.
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteTodo(int id)
    {
        var todo = await dbContext.Todos.FindAsync(id);
        if (todo is null)
        {
            return NotFound();
        }

        dbContext.Todos.Remove(todo);
        await dbContext.SaveChangesAsync();
        return NoContent();
    }
}
