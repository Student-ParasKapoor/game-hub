// src/pages/Home.tsx
import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { fetchGames } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

interface HomeProps {
  filters: { category?: string; year?: string; popularity?: string; tags?: string };
  searchTerm: string;
}

function Home({ filters, searchTerm }: HomeProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const favoriteGames = useSelector((state: RootState) => state.favorites.games);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const apiParams = {
      page,
      page_size: 40,
      ...(filters.category && { genres: filters.category }),
      ...(filters.year && { dates: `${filters.year}-01-01,${filters.year}-12-31` }),
      ...(searchTerm && { search: searchTerm }),
      ...(filters.popularity && { ordering: filters.popularity }),
      ...(filters.tags && { tags: filters.tags }),
    };
    fetchGames(apiParams)
      .then((data) => {
        if (data.results.length === 0 && filters.popularity) {
          const fallbackParams = { ...apiParams };
          delete fallbackParams.ordering;
          return fetchGames(fallbackParams);
        }
        return data;
      })
      .then((data) => setGames(data.results || []))
      .catch(() => setError('Failed to load games. Please try again later.'))
      .finally(() => setLoading(false));
  }, [page, filters, searchTerm]);

  const handleToggleFavorite = (game: Game) => {
    const isFavorite = favoriteGames.some((fav) => fav.id === game.id);
    if (isFavorite) {
      dispatch(removeFavorite(game.id));
    } else {
      dispatch(addFavorite(game));
    }
  };

  return (
    <>
      <SignedIn>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading games...</p>
          </div>
        ) : error ? (
          <p className="text-center py-4 text-danger">{error}</p>
        ) : games.length === 0 ? (
          <div className="text-center py-5">
            <img src="https://via.placeholder.com/150?text=No+Games" alt="No games" className="mb-3" />
            <p className="text-muted">No games found with the selected filters. Try adjusting your filters!</p>
          </div>
        ) : (
          <>
            <Row>
              {games.map((game) => (
                <Col xs={12} sm={6} md={4} lg={3} key={game.id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Img variant="top" src={game.background_image || 'https://via.placeholder.com/300x200'} />
                    <Card.Body>
                      <Card.Title>
                        <Link to={`/game/${game.id}`} className="text-decoration-none text-dark">
                          {game.name}
                        </Link>
                      </Card.Title>
                      <Card.Text>Rating: {game.rating}/5</Card.Text>
                      <Button
                        variant={favoriteGames.some((fav) => fav.id === game.id) ? 'danger' : 'outline-primary'}
                        onClick={() => handleToggleFavorite(game)}
                      >
                        {favoriteGames.some((fav) => fav.id === game.id) ? 'Remove' : 'Add to Library'}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="outline-primary"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1 || loading}
              >
                Previous
              </Button>
              <Button variant="outline-primary" onClick={() => setPage((prev) => prev + 1)} disabled={loading}>
                Next
              </Button>
            </div>
          </>
        )}
      </SignedIn>
      <SignedOut>
        <div className="text-center py-4">
          <p className="text-muted">Please sign in to view games.</p>
          <SignInButton mode="modal">
            <Button variant="primary">Sign In</Button>
          </SignInButton>
        </div>
      </SignedOut>
    </>
  );
}

export default Home;