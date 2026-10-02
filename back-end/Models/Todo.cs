using System.ComponentModel.DataAnnotations;

namespace back_end.Models;

public class Todo
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    public bool IsCompleted { get; set; }
}
