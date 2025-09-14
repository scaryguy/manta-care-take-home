import { Link, Outlet } from "@tanstack/react-router";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-background p-6">
      <header className="w-full max-w-4xl pb-4">
        <Link to="/symptoms">
          <h1 className="text-4xl">Manta Care</h1>
        </Link>

        <p>Welcome to Symptoms & Interventions</p>
      </header>
      <main className="w-full max-w-4xl p-6 rounded-lg border bg-card p-6 text-card-foreground">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
