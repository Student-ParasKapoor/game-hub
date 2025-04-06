// src/App.tsx
import { useState } from 'react';
import { Container, Row, Col, Offcanvas } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Library from './pages/Library';
import GameDetail from './pages/GameDetail';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  const [filters, setFilters] = useState<{ category?: string; year?: string; popularity?: string; tags?: string }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const libraryCount = useSelector((state: RootState) => state.favorites.games.length);

  const handleFilterChange = (newFilter: { category?: string; year?: string; popularity?: string; tags?: string }) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const toggleSidebar = () => {
    console.log('toggleSidebar called, current showSidebar:', showSidebar);
    setShowSidebar((prev) => {
      console.log('New showSidebar value:', !prev);
      return !prev;
    });
  };

  return (
    <Router>
      <Container fluid>
        <Header onSearch={handleSearch} libraryCount={libraryCount} toggleSidebar={toggleSidebar} />
        <Row>
          <Col xs={12} md={2} className="p-0"> {/* Reduced from md={3} to md={2} */}
            <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} responsive="md" className="sidebar">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filters</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Sidebar onFilterChange={handleFilterChange} currentFilters={filters} />
              </Offcanvas.Body>
            </Offcanvas>
          </Col>
          <Col xs={12} md={10}> {/* Increased from md={9} to md={10} */}
            <Routes>
              <Route path="/" element={<Home filters={filters} searchTerm={searchTerm} />} />
              <Route path="/library" element={<Library />} />
              <Route path="/game/:id" element={<GameDetail />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;