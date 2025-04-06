// src/components/Sidebar.tsx
import { Form, Button } from 'react-bootstrap';

interface SidebarProps {
  onFilterChange: (filters: { category?: string; year?: string; popularity?: string; tags?: string }) => void;
  currentFilters: { category?: string; year?: string; popularity?: string; tags?: string };
}

function Sidebar({ onFilterChange, currentFilters }: SidebarProps) {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('Filter Change:', { name, value }); // Debug
    onFilterChange({ [name]: value || undefined });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
    onFilterChange({ tags: selectedTags.join(',') || undefined });
  };

  const handleReset = () => {
    onFilterChange({ category: '', year: '', popularity: '', tags: '' });
  };

  const tagsArray = currentFilters.tags ? currentFilters.tags.split(',') : [];

  return (
    <div className="p-3 sidebar" style={{ minHeight: '100vh' }}>
      <h5>Filters</h5>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={currentFilters.category || ''}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="action">Action</option>
            <option value="role-playing-games-rpg">RPG</option> {/* Correct slug */}
            <option value="adventure">Adventure</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Release Year</Form.Label>
          <Form.Control
            as="input"
            type="number"
            name="year"
            value={currentFilters.year || ''}
            placeholder="e.g., 2023"
            min="1900"
            max={new Date().getFullYear()}
            onChange={handleFilterChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Popularity</Form.Label>
          <Form.Select
            name="popularity"
            value={currentFilters.popularity || ''}
            onChange={handleFilterChange}
          >
            <option value="">Default</option>
            <option value="-rating">Most Popular</option>
            <option value="rating">Least Popular</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Form.Select
            name="tags"
            multiple
            value={tagsArray}
            onChange={handleTagsChange}
          >
            <option value="indie">Indie</option>
            <option value="multiplayer">Multiplayer</option>
            <option value="singleplayer">Singleplayer</option>
            <option value="open-world">Open World</option>
          </Form.Select>
        </Form.Group>
        <Button variant="outline-secondary" onClick={handleReset}>
          Reset Filters
        </Button>
      </Form>
    </div>
  );
}

export default Sidebar;