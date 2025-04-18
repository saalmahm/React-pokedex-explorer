import { Card, CardContent, CardMedia, Typography, Box, Chip, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const typeColors = {
  normal: '#A8A878',
  fighting: '#C03028',
  flying: '#A890F0',
  poison: '#A040A0',
  ground: '#E0C068',
  rock: '#B8A038',
  bug: '#A8B820',
  ghost: '#705898',
  steel: '#B8B8D0',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
  unknown: '#68A090',
  shadow: '#705848'
};

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id || pokemon.name}`);
  };

  const extractId = (url) => {
    if (!url) return "1";
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  const id = pokemon.id || extractId(pokemon.url);
  
  const imageUrl = pokemon.sprites?.other?.['official-artwork']?.front_default || 
                   pokemon.sprites?.front_default ||
                   `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        m: 1, 
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      elevation={3}
    >
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={pokemon.name}
          sx={{ 
            objectFit: 'contain',
            bgcolor: '#f5f5f5',
            p: 2
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" gutterBottom noWrap sx={{ textTransform: 'capitalize' }}>
            {pokemon.name.replace(/-/g, ' ')}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" gutterBottom>
            #{id.toString().padStart(3, '0')}
          </Typography>
          
          {pokemon.types && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {pokemon.types.map(typeInfo => (
                <Chip 
                  key={typeInfo.type.name}
                  label={typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
                  size="small"
                  sx={{ 
                    bgcolor: typeColors[typeInfo.type.name] || '#999',
                    color: '#fff',
                    fontWeight: 'bold'
                  }}
                />
              ))}
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PokemonCard;