import './App.css'
import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboard/Page';
import TeamPage from './pages/team/Page';
import LoginPage from './pages/login/Page';

function App() {

  return (
    <Routes>
      {/* Define the /dashboard route */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/team/:id" element={<TeamPage />} />
      <Route path="/login" element={<LoginPage />}/>
    </Routes>
  );

  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
