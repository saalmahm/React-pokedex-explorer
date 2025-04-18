import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Chip, 
  Tabs, 
  Tab, 
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import PokemonStats from './PokemonStats';
import PokemonEvolutions from './PokemonEvolutions';


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

const PokemonDetails = ({ pokemon, species, evolutionChain }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  const formatCharacteristic = (value, unit = '') => {
    if (unit === 'height') {
      return `${(value / 10).toFixed(1)} m`;
    }
    if (unit === 'weight') {
      return `${(value / 10).toFixed(1)} kg`;
    }
    return value;
  };


  const getDescription = () => {
    if (!species) return "Aucune description disponible.";
    

    const frenchEntry = species.flavor_text_entries.find(
      entry => entry.language.name === 'fr'
    );
    

    const englishEntry = species.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );
    
    return (frenchEntry || englishEntry)?.flavor_text.replace(/[\n\f]/g, ' ') || "Aucune description disponible.";
  };


  if (!pokemon || !pokemon.sprites) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1">Chargement des détails...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Image du Pokémon */}
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <img
              src={pokemon.sprites.other?.['official-artwork']?.front_default || 
                   pokemon.sprites.front_default || 
                   'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'}
              alt={pokemon.name}
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                maxHeight: '300px'
              }}
            />
            
            {/* Types */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
              {pokemon.types && pokemon.types.map(typeInfo => (
                <Chip 
                  key={typeInfo.type.name}
                  label={typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
                  sx={{ 
                    bgcolor: typeColors[typeInfo.type.name] || '#999',
                    color: '#fff',
                    fontWeight: 'bold',
                    px: 2
                  }}
                />
              ))}
            </Box>
          </Grid>
          
          {/* Informations générales */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" component="h1" sx={{ textTransform: 'capitalize' }}>
                {pokemon.name.replace(/-/g, ' ')}
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                #{pokemon.id.toString().padStart(3, '0')}
              </Typography>
            </Box>
            
            <Typography variant="body1" paragraph>
              {getDescription()}
            </Typography>
            
            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Taille</Typography>
                <Typography variant="body1">{formatCharacteristic(pokemon.height, 'height')}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Poids</Typography>
                <Typography variant="body1">{formatCharacteristic(pokemon.weight, 'weight')}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Catégorie</Typography>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                  {species?.genera?.find(g => g.language.name === 'fr')?.genus || 
                   species?.genera?.find(g => g.language.name === 'en')?.genus || 
                   'Inconnu'}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">Habitat</Typography>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                  {species?.habitat?.name?.replace(/-/g, ' ') || 'Inconnu'}
                </Typography>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            {/* Capacités */}
            <Typography variant="h6" gutterBottom>Capacités</Typography>
            <Grid container spacing={1}>
              {pokemon.abilities.map((abilityInfo) => (
                <Grid item key={abilityInfo.ability.name}>
                  <Chip 
                    label={abilityInfo.ability.name.replace(/-/g, ' ')}
                    sx={{ textTransform: 'capitalize' }}
                    variant={abilityInfo.is_hidden ? 'outlined' : 'filled'}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Navigation par onglets */}
      <Paper elevation={2} sx={{ mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Statistiques" />
          <Tab label="Évolutions" />
          <Tab label="Attaques" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {/* Onglet Statistiques */}
          {tabValue === 0 && (
            <PokemonStats stats={pokemon.stats} />
          )}
          
          {/* Onglet Évolutions */}
          {tabValue === 1 && (
            <PokemonEvolutions 
              evolutionChain={evolutionChain} 
              currentPokemonId={pokemon.id} 
            />
          )}
          
          {/* Onglet Attaques */}
          {tabValue === 2 && (
            <List>
              {pokemon.moves.slice(0, 20).map((moveInfo) => (
                <ListItem key={moveInfo.move.name} divider>
                  <ListItemText 
                    primary={moveInfo.move.name.replace(/-/g, ' ')} 
                    primaryTypographyProps={{ sx: { textTransform: 'capitalize' } }}
                  />
                </ListItem>
              ))}
              {pokemon.moves.length > 20 && (
                <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: 'text.secondary' }}>
                  {pokemon.moves.length - 20} attaques supplémentaires non affichées
                </Typography>
              )}
            </List>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default PokemonDetails;