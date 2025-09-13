import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="text-3xl font-bold text-blue-600">
        Hello, Tailwind CSS with Vite React!
      </div>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Shadcn Hello!</Button>
      </div>
    </>
  );
}

export default App;
