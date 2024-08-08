import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { store } from './store';
import { queryClient } from './react-query';

import ContactsPage from './pages/ContactsPage';
import ChartsAndMapsPage from './pages/ChartsAndMapsPage';
import Navbar from './component/Navbar'; 
import Sidebar from './component/Sidebar';

const App: React.FC = () => {
  
  
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="flex flex-col h-screen">
            <Navbar /> 
            <div className="flex flex-1">
              <Sidebar />
              <div className="flex-1 p-8">
                <Routes>
                  <Route path="/" element={<ContactsPage />} />
                  <Route path="/charts-and-maps" element={<ChartsAndMapsPage />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
