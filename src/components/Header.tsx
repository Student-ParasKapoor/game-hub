// src/components/Header.tsx
import { useState } from 'react';
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap';
import { UserButton, useUser, SignInButton, SignOutButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearch: (term: string) => void;
  libraryCount: number;
  toggleSidebar: () => void;
}

function Header({ onSearch, libraryCount, toggleSidebar }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { isSignedIn } = useUser();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Button
        variant="outline-primary"
        className="me-2 d-md-none"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <i className="bi bi-list"></i>
      </Button>
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <img
          src="/logo.png" // Path to logo in public/
          alt="GameHub Logo"
          height="30" // Adjust size as needed
          className="me-2"
        />
        GameHub
      </Navbar.Brand>
      <Form className="d-flex flex-grow-1" onSubmit={handleSearch}>
        <FormControl
          type="search"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
        />
        <Button variant="outline-primary" type="submit" className="ms-2">
          Search
        </Button>
      </Form>
      <Nav className="ms-3">
        <Nav.Link as={Link} to="/library">Library ({libraryCount})</Nav.Link>
        {isSignedIn ? (
          <SignOutButton>
            <Button variant="outline-danger">Sign Out</Button>
          </SignOutButton>
        ) : (
          <SignInButton mode="modal">
            <Button variant="outline-success">Sign In</Button>
          </SignInButton>
        )}
      </Nav>
    </Navbar>
  );
}

export default Header;