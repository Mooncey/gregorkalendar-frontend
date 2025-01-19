import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboard/Page';
import TeamPage from './pages/team/Page';
import LoginPage from './pages/login/Page';
import SettingsPage from './pages/settings/Page';
import Layout from './layout/Layout';

function App() {


  return (
    <Routes>
      {/* Login page without layout */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Pages with Layout */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <DashboardPage />
          </Layout>
        }
      />
      <Route
        path="/team/:id"
        element={
          <Layout>
            <TeamPage />
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout>
            <SettingsPage />
          </Layout>
        }
      />
    </Routes>
  );

  // return (
  //   <Routes>
  //     {/* Define the /dashboard route */}
  //     <Route path="/dashboard" element={<DashboardPage />} />
  //     <Route path="/team/:id" element={<TeamPage />} />
  //     <Route path="/login" element={<LoginPage />}/>
  //     <Route path="/settings" element={<SettingsPage />}/>
  //   </Routes>
  // );

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
