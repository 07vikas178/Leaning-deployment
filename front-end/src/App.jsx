import { useEffect, useState } from 'react'
import './App.css'

// Change this one URL when the API is deployed to Azure.
const API_URL = 'https://v7-todo-app-htfhhfb9hpaxe8hm.centralus-01.azurewebsites.net/api/Todos'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  async function loadTodos() {
    // Fetch sends an HTTP request from React to the ASP.NET Core API.
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error('Could not load todos. Is the API running?')
    setTodos(await response.json())
  }

  useEffect(() => {
    loadTodos().catch((requestError) => setError(requestError.message))
  }, [])

  async function addTodo(event) {
    event.preventDefault()
    const cleanTitle = title.trim()
    if (!cleanTitle) return

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: cleanTitle }),
    })
    if (!response.ok) {
      setError('Could not add the todo.')
      return
    }
    setTitle('')
    setError('')
    await loadTodos()
  }

  async function updateTodo(todo, isCompleted) {
    const response = await fetch(`${API_URL}/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo, isCompleted }),
    })
    if (!response.ok) {
      setError('Could not update the todo.')
      return
    }
    setError('')
    await loadTodos()
  }

  async function deleteTodo(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!response.ok) {
      setError('Could not delete the todo.')
      return
    }
    setError('')
    await loadTodos()
  }

  return (
    <main className="todo-card">
      <h1>Todo List</h1>
      <form className="add-form" onSubmit={addTodo}>
        <label className="visually-hidden" htmlFor="todo-title">New todo</label>
        <input
          id="todo-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What needs doing?"
          maxLength={200}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error" role="alert">{error}</p>}
      {todos.length === 0 ? (
        <p className="empty-state">No todos yet. Add one above.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <label className={todo.isCompleted ? 'todo-title completed' : 'todo-title'}>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={(event) => updateTodo(todo, event.target.checked)}
                />
                <span>{todo.title}</span>
              </label>
              <button className="delete-button" type="button" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
