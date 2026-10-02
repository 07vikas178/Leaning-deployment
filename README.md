# Todo List learning app

A small React frontend and ASP.NET Core Web API backed by SQL Server.

## SQL Server

The sample connection string in `back-end/appsettings.json` uses SQL Server Express LocalDB (`MSSQLLocalDB`) with Windows authentication. Install SQL Server Express LocalDB if it is not already available. Change `DefaultConnection` if you use a different SQL Server instance or authentication method. For Azure SQL later, replace it with the Azure SQL connection string and keep credentials in deployment configuration rather than source control.

## Backend setup

From the repository root, install the Entity Framework tools once:

```powershell
dotnet tool install --global dotnet-ef --version 10.0.12
```

Restore the backend NuGet packages:

```powershell
cd back-end
dotnet restore
```

Create the initial database migration and apply it to SQL Server:

```powershell
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Run the API (http://localhost:5000):

```powershell
dotnet run --launch-profile http
```

While the backend is running in Development, open `http://localhost:5000/swagger` to browse and try the API endpoints.

## Frontend setup

In a second terminal, install npm packages:

```powershell
cd front-end
npm install
```

Run the React frontend (http://localhost:5173):

```powershell
npm run dev
```

The frontend API URL is defined near the top of `front-end/src/App.jsx`. The browser sends HTTP requests to the ASP.NET Core controller, which uses Entity Framework Core to read and write SQL Server data. CORS in `back-end/Program.cs` allows the local Vite origin to call the API.

## Deployment Path

React Frontend  
↓  
ASP.NET Core Web API  
↓  
Azure App Service  
↓  
Azure SQL
