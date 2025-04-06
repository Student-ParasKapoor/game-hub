import { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Spinner, Button} from 'react-bootstrap';
import { fetchGameDetails } from '../services/api';


interface GameDetail {
  id: number;
  name: string;
  description_raw: string;
  background_image: string;
  rating: number;
  screenshots: { id: number; image: string }[];
  requirements?: { minimum?: string; recommended?: string };
}

function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<GameDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);
      fetchGameDetails(parseInt(id))
        .then((data) => {
          setGame({
            id: data.id,
            name: data.name,
            description_raw: data.description_raw || 'No description available.',
            background_image: data.background_image || 'https://via.placeholder.com/300x200',
            rating: data.rating,
            screenshots: data.screenshots?.map((s: any) => ({ id: s.id, image: s.image })) || [],
            requirements: data.platforms?.find((p: any) => p.platform.name === 'PC')?.requirements || undefined,
          });
        })
        .catch(() => setError('Failed to load game details. Please try again later.'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading game details...</p>
      </div>
    );
  }
  if (error) {
    return <div className="text-center py-5 text-danger">{error}</div>;
  }
  if (!game) {
    return <div className="text-center py-5 text-muted">Game not found.</div>;
  }

  return (
    <Container className="py-4">
      <Button
        variant="outline-primary"
        className="mb-4"
        onClick={() => navigate('/')}
      >
        <i className="bi bi-arrow-left me-2"></i> Back to Games
      </Button>
      <h2 className="mb-4">{game.name}</h2>
      <Row>
        <Col xs={12} md={6}>
          <Card className="shadow-sm">
            <Card.Img variant="top" src={game.background_image} />
            <Card.Body>
              <Card.Text>{game.description_raw}</Card.Text>
              <Badge bg="primary">Rating: {game.rating}/5</Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <h4 className="mb-3">Screenshots</h4>
          {game.screenshots.length > 0 ? (
            game.screenshots.map((screenshot) => (
              <img
                key={screenshot.id}
                src={screenshot.image}
                alt="Screenshot"
                className="img-fluid mb-3 rounded shadow-sm"
                style={{ maxHeight: '200px' }}
              />
            ))
          ) : (
            <p className="text-muted">No screenshots available.</p>
          )}
          {game.requirements && (
            <>
              <h4 className="mt-4 mb-3">System Requirements</h4>
              {game.requirements.minimum && (
                <p><strong>Minimum:</strong> {game.requirements.minimum}</p>
              )}
              {game.requirements.recommended && (
                <p><strong>Recommended:</strong> {game.requirements.recommended}</p>
              )}
            </>
          )}
          <p className="text-muted"><em>Pricing information is not available via RAWG API.</em></p>
        </Col>
      </Row>
    </Container>
  );
}

export default GameDetail;