import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { LostItemsPage } from './pages/LostItemsPage';
import { FoundItemsPage } from './pages/FoundItemsPage';
import { ReportLostPage } from './pages/ReportLostPage';
import { ReportFoundPage } from './pages/ReportFoundPage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ItemProvider } from './context/ItemContext';
import { ToastProvider } from './context/ToastContext';

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ItemProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="lost" element={<LostItemsPage />} />
              <Route path="found" element={<FoundItemsPage />} />
              <Route path="report-lost" element={<ReportLostPage />} />
              <Route path="report-found" element={<ReportFoundPage />} />
              <Route path="item/:id" element={<ItemDetailPage />} />
              <Route path="404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
          </Routes>
        </ItemProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
