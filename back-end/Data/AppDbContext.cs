using back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end.Data;

// DbContext is the bridge Entity Framework uses to read and write SQL Server data.
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Todo> Todos => Set<Todo>();
}
