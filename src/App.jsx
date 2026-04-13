import React, { useState } from 'react';
import Login from './pages/Login';
import MDDashboard from './pages/MDDashboard';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import ScoringDashboard from './pages/ScoringDashboard';
import DLRSheet from './pages/DLRSheet';
import SupervisorPortal from './pages/SupervisorPortal';
import ClientChecklist from './pages/ClientChecklist';
import SiteExecution from './pages/SiteExecution';
import VendorHub from './pages/VendorHub';
import BOQEstimate from './pages/BOQEstimate';
import './index.css';

export default function App() {
  const [page, setPage]             = useState('login');
  const [user, setUser]             = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const handleLogin  = (u) => { setUser(u); setPage('dashboard'); };
  const handleLogout = () => { setUser(null); setPage('login'); };
  const openProject  = (p) => { setActiveProject(p); setPage('project-detail'); };
  const goBack       = (dest) => setPage(dest || 'projects');

  const shared = { user, onNavigate: setPage, onLogout: handleLogout };

  if (page === 'login')          return <Login onLogin={handleLogin} />;
  if (page === 'dashboard')      return <MDDashboard {...shared} onOpenProject={openProject} />;
  if (page === 'projects')       return <ProjectList {...shared} onOpenProject={openProject} />;
  if (page === 'scoring')        return <ScoringDashboard {...shared} />;
  if (page === 'dlr')            return <DLRSheet {...shared} project={activeProject} />;
  if (page === 'supervisor')     return <SupervisorPortal {...shared} />;
  if (page === 'checklist')      return <ClientChecklist {...shared} />;
  if (page === 'site')           return <SiteExecution {...shared} />;
  if (page === 'vendor')         return <VendorHub {...shared} />;
  if (page === 'boq')            return <BOQEstimate {...shared} />;
  if (page === 'project-detail') return <ProjectDetail {...shared} project={activeProject} onBack={() => goBack('projects')} />;
  return null;
}
