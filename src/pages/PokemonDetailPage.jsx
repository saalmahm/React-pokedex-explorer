import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Container, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPokemonDetails, getPokemonSpecies, getEvolutionChain } from '../api/pokeApi';
import PokemonDetails from '../components/pokemon/PokemonDetails';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const PokemonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: pokemon, status: pokemonStatus, error: pokemonError } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemonDetails(id)
  });
  
  const { data: species, status: speciesStatus } = useQuery({
    queryKey: ['species', id],
    queryFn: () => getPokemonSpecies(id),
    enabled: !!pokemon
  });
  
  const { data: evolutionChain, status: evolutionStatus } = useQuery({
    queryKey: ['evolution', species?.evolution_chain?.url],
    queryFn: () => getEvolutionChain(species.evolution_chain.url),
    enabled: !!species?.evolution_chain?.url
  });
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handlePrevious = () => {
    if (pokemon && pokemon.id > 1) {
      navigate(`/pokemon/${pokemon.id - 1}`);
    }
  };
  
  const handleNext = () => {
    if (pokemon) {
      navigate(`/pokemon/${pokemon.id + 1}`);
    }
  };
  
  if (pokemonStatus === 'loading') {
    return (
      <Container>
        <Loader message="Chargement des données du Pokémon..." />
      </Container>
    );
  }
  
  if (pokemonStatus === 'error') {
    return (
      <Container>
        <Box sx={{ mb: 4 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>
            Retour
          </Button>
        </Box>
        <ErrorMessage 
          message={`Erreur lors du chargement du Pokémon: ${pokemonError.message}`} 
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>
          Retour
        </Button>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            onClick={handlePrevious}
            disabled={pokemon && pokemon.id <= 1}
          >
            Précédent
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleNext}
          >
            Suivant
          </Button>
        </Box>
      </Box>
      
      {(speciesStatus === 'loading' || evolutionStatus === 'loading') && (
        <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
          <Typography variant="caption" color="text.secondary">
            Chargement des informations supplémentaires...
          </Typography>
        </Box>
      )}
      
      <PokemonDetails 
        pokemon={pokemon} 
        species={species} 
        evolutionChain={evolutionChain}
      />
    </Container>
  );
};

export default PokemonDetailPage;