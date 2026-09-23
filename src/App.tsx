import React, { useState } from 'react';
import { CaseProvider } from './context/CaseContext';
import { Layout } from './components/layout/Layout';
import { PageId } from './components/layout/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { UnifiedInboxPage } from './pages/UnifiedInboxPage';
import { SubmitRequestPage } from './pages/SubmitRequestPage';
import { CaseDetailPage } from './pages/CaseDetailPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { FeesPage } from './pages/FeesPage';
import { ExamsPage } from './pages/ExamsPage';
import { ResultsPage } from './pages/ResultsPage';
import { ComplaintsPage } from './pages/ComplaintsPage';
import { ScholarshipsPage } from './pages/ScholarshipsPage';
import { DegreeProgramsPage } from './pages/DegreeProgramsPage';
import { PlacementsPage } from './pages/PlacementsPage';
import { ResearchPublicationsPage } from './pages/ResearchPublicationsPage';
import { FacultyServicesPage } from './pages/FacultyServicesPage';
import { DepartmentApprovalsPage } from './pages/DepartmentApprovalsPage';
import { ReportsPage } from './pages/ReportsPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';

export function AppContent() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  const handleSelectCase = (caseId: string) => {
    setActiveCaseId(caseId);
    setActivePage('case-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} onSelectCase={handleSelectCase} />;
      case 'inbox':
        return <UnifiedInboxPage onSelectCase={handleSelectCase} />;
      case 'submit':
        return <SubmitRequestPage onNavigate={handleNavigate} onSelectCase={handleSelectCase} />;
      case 'case-detail':
        return activeCaseId ? (
          <CaseDetailPage caseId={activeCaseId} onNavigate={handleNavigate} />
        ) : (
          <UnifiedInboxPage onSelectCase={handleSelectCase} />
        );
      case 'admissions':
        return <AdmissionsPage onSelectCase={handleSelectCase} onNavigate={handleNavigate} />;
      case 'fees':
        return <FeesPage onSelectCase={handleSelectCase} onNavigate={handleNavigate} />;
      case 'exams':
        return <ExamsPage onSelectCase={handleSelectCase} onNavigate={handleNavigate} />;
      case 'results':
        return <ResultsPage onSelectCase={handleSelectCase} onNavigate={handleNavigate} />;
      case 'complaints':
        return <ComplaintsPage onSelectCase={handleSelectCase} onNavigate={handleNavigate} />;
      case 'scholarships':
        return <ScholarshipsPage onSelectCase={handleSelectCase} onNavigate={handleNavigate} />;
      case 'degree-programs':
        return <DegreeProgramsPage onSelectCase={handleSelectCase} onNavigate={handleNavigate} />;
      case 'placements':
        return <PlacementsPage onSelectCase={handleSelectCase} onNavigate={handleNavigate} />;
      case 'research-publications':
        return <ResearchPublicationsPage onSelectCase={handleSelectCase} onNavigate={handleNavigate} />;
      case 'faculty-services':
        return <FacultyServicesPage onSelectCase={handleSelectCase} onNavigate={handleNavigate} />;
      case 'department-approvals':
        return <DepartmentApprovalsPage onSelectCase={handleSelectCase} />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <AdminSettingsPage />;
      default:
        return <DashboardPage onNavigate={handleNavigate} onSelectCase={handleSelectCase} />;
    }
  };

  return (
    <Layout activePage={activePage} onNavigate={handleNavigate}>
      {renderCurrentPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <CaseProvider>
      <AppContent />
    </CaseProvider>
  );
}
