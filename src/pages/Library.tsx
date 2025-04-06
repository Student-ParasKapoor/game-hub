import { Row, Col, Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFavorite } from '../redux/slices/favoritesSlice';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

function Library() {
  const dispatch = useDispatch();
  const favoriteGames = useSelector((state: RootState) => state.favorites.games);

  return (
    <div className="p-3">
      <SignedIn>
        <h2 className="mb-4">Your Library</h2>
        {favoriteGames.length === 0 ? (
          <div className="text-center py-5">
            <img src="https://via.placeholder.com/150?text=Empty+Library" alt="Empty library" className="mb-3" />
            <p className="text-muted">Your library is empty. Add some games from the home page!</p>
          </div>
        ) : (
          <Row>
            {favoriteGames.map((game) => (
              <Col xs={12} sm={6} md={4} lg={3} key={game.id} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={game.background_image} />
                  <Card.Body>
                    <Card.Title>{game.name}</Card.Title>
                    <Card.Text>Rating: {game.rating}/5</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => dispatch(removeFavorite(game.id))}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </SignedIn>
      <SignedOut>
        <div className="text-center py-4">
          <p>Please sign in to view your library.</p>
          <SignInButton mode="modal">
            <Button variant="primary">Sign In</Button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}

export default Library;