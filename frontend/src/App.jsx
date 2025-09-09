import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <div className="min-h-screen">
          <AppRoutes />
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
