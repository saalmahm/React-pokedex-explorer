import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, Chip, useTheme, useMediaQuery, Divider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useQuery } from '@tanstack/react-query';
import { getPokemonDetails } from '../../api/pokeApi';
import { Link } from 'react-router-dom';

const PokemonEvolutions = ({ evolutionChain, currentPokemonId }) => {
  const [evolutionData, setEvolutionData] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const processEvolutionChain = async (chain) => {
    let evolutions = [];
    

    const getEvolutionData = async (data, parent = null) => {
      if (!data) return;
      

      const urlParts = data.species.url.split('/');
      const id = urlParts[urlParts.length - 2];
      

      try {
        const details = await getPokemonDetails(id);
        

        const evolutionObj = {
          id,
          name: data.species.name,
          image: details.sprites.other['official-artwork'].front_default,
          types: details.types,
          parent,
          evolution_details: data.evolution_details.length > 0 ? data.evolution_details[0] : null
        };
        
        evolutions.push(evolutionObj);
        

        if (data.evolves_to && data.evolves_to.length > 0) {
          for (const evolution of data.evolves_to) {
            await getEvolutionData(evolution, evolutionObj);
          }
        }
      } catch (error) {
        console.error(`Erreur lors du chargement des détails pour ${data.species.name}:`, error);
      }
    };
    
    await getEvolutionData(chain);
    return evolutions;
  };
  
  useEffect(() => {
    if (evolutionChain && evolutionChain.chain) {
      processEvolutionChain(evolutionChain.chain).then(data => {
        setEvolutionData(data);
      });
    }
  }, [evolutionChain]);
  
  if (!evolutionChain) {
    return (
      <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
        Aucune information d'évolution disponible.
      </Typography>
    );
  }
  
  // Si aucune évolution, afficher un message
  if (evolutionData.length <= 1) {
    return (
      <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
        Ce Pokémon n'a pas d'évolution connue.
      </Typography>
    );
  }
  

  const formatEvolutionDetails = (details) => {
    if (!details) return "Évolution inconnue";
    
    const conditions = [];
    
    if (details.min_level) {
      conditions.push(`Niveau ${details.min_level}`);
    }
    
    if (details.item) {
      conditions.push(`Utiliser ${details.item.name.replace(/-/g, ' ')}`);
    }
    
    if (details.trigger && details.trigger.name === 'trade') {
      conditions.push('Échange');
    }
    
    if (details.held_item) {
      conditions.push(`Tenir ${details.held_item.name.replace(/-/g, ' ')}`);
    }
    
    if (details.min_happiness) {
      conditions.push(`Bonheur ≥ ${details.min_happiness}`);
    }
    
    if (details.time_of_day) {
      conditions.push(`Pendant ${details.time_of_day === 'day' ? 'le jour' : 'la nuit'}`);
    }
    
    return conditions.length > 0 ? conditions.join(', ') : "Évolution";
  };
  

  const groupEvolutionsByStage = () => {
    const stages = [];
    let currentStage = evolutionData.filter(evo => evo.parent === null);
    
    while (currentStage.length > 0) {
      stages.push(currentStage);
      const nextStage = [];
      
      for (const pokemon of currentStage) {
        const evolutions = evolutionData.filter(evo => evo.parent && evo.parent.id === pokemon.id);
        nextStage.push(...evolutions);
      }
      
      currentStage = nextStage;
    }
    
    return stages;
  };
  
  const evolutionStages = groupEvolutionsByStage();
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Chaîne d'évolution
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'stretch', justifyContent: 'center' }}>
        {evolutionStages.map((stage, stageIndex) => (
          <Box 
            key={`stage-${stageIndex}`} 
            sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'row' : 'column', 
              alignItems: 'center',
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              flex: 1,
              justifyContent: 'center'
            }}
          >
            {stage.map((pokemon, pokemonIndex) => {
              const isCurrentPokemon = pokemon.id === currentPokemonId.toString();
              
              return (
                <Box 
                  key={pokemon.id}
                  sx={{ 
                    m: 1, 
                    textAlign: 'center',
                    flex: isMobile ? '0 0 45%' : 'auto'
                  }}
                >
                  <Card 
                    component={Link}
                    to={`/pokemon/${pokemon.id}`}
                    sx={{ 
                      textDecoration: 'none',
                      transition: '0.3s',
                      transform: isCurrentPokemon ? 'scale(1.05)' : 'scale(1)',
                      border: isCurrentPokemon ? `2px solid ${theme.palette.primary.main}` : 'none',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={pokemon.image}
                      alt={pokemon.name}
                      sx={{ 
                        objectFit: 'contain',
                        bgcolor: '#f5f5f5',
                        p: 1
                      }}
                    />
                    <CardContent>
                      <Typography variant="body1" component="div" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                        {pokemon.name.replace(/-/g, ' ')}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary">
                        #{pokemon.id.padStart(3, '0')}
                      </Typography>
                      
                      {pokemon.evolution_details && (
                        <Chip 
                          size="small"
                          label={formatEvolutionDetails(pokemon.evolution_details)}
                          sx={{ mt: 1, fontSize: '0.7rem' }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
            
            {/* Flèche entre les stages d'évolution */}
            {stageIndex < evolutionStages.length - 1 && (
              isMobile ? (
                <Divider sx={{ width: '100%', my: 2 }} />
              ) : (
                <ArrowForwardIcon 
                  sx={{ 
                    transform: isMobile ? 'rotate(90deg)' : 'none',
                    my: isMobile ? 1 : 0,
                    mx: isMobile ? 0 : 1,
                    color: theme.palette.text.secondary
                  }} 
                />
              )
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PokemonEvolutions;