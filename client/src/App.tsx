import AppRouter from "./router/appRouter";
import kuku from "./kuku.jpg";

function App() {
  return (
    <div
      className="bg-cover bg-center bg-fixed"
      // style={{ backgroundImage: `url(${kuku})` }}
    >
      <AppRouter />
    </div>
  );
}

export default App;
