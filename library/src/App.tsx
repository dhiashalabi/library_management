import { FrappeProvider } from "frappe-react-sdk";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ""} url="http://react.localhost:8080">
        <Outlet />
      </FrappeProvider>
    </div>
  );
}

export default App;
