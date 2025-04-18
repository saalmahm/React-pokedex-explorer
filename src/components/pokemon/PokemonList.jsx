import { useState, useEffect, useRef, useCallback } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import PokemonCard from './PokemonCard';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import { getPokemonList, getPokemonDetails } from '../../api/pokeApi';

const PokemonList = ({ searchParams }) => {
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const observerTarget = useRef(null);
  
  // Fonction pour charger la liste des Pokémon
  const fetchPokemonList = async ({ pageParam = 0 }) => {
    const limit = 20;
    const result = await getPokemonList(limit, pageParam);
    
    // Chargement des détails pour chaque Pokémon
    const detailedPokemon = await Promise.all(
      result.results.map(async (pokemon) => {
        try {
          return await getPokemonDetails(pokemon.name);
        } catch (error) {
          console.error(`Erreur lors du chargement des détails pour ${pokemon.name}:`, error);
          return pokemon; // Fallback sur les données de base
        }
      })
    );
    
    return {
      pokemon: detailedPokemon,
      nextOffset: pageParam + limit,
      hasMore: !!result.next
    };
  };
  
  // Configuration de la requête infinie
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: ['pokemonList', searchParams],
    queryFn: fetchPokemonList,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextOffset : undefined,
    enabled: !searchParams.name && !searchParams.type 
    
  });
  

  const lastPokemonRef = useCallback(node => {
    if (isFetchingNextPage) return;
    
    if (observerTarget.current) observerTarget.current.disconnect();
    
    observerTarget.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    
    if (node) observerTarget.current.observe(node);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);
  

  useEffect(() => {
    if (data && !searchParams.name && !searchParams.type) {
      const allPokemon = data.pages.flatMap(page => page.pokemon);
      setDisplayedPokemon(allPokemon);
    }
  }, [data, searchParams]);
  
  // Si en état d'erreur
  if (status === 'error') {
    return <ErrorMessage message={`Erreur de chargement: ${error.message}`} onRetry={refetch} />;
  }
  
  // Si aucun Pokémon n'est trouvé
  if (displayedPokemon.length === 0 && status !== 'loading') {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Aucun Pokémon trouvé.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Essayez avec un autre terme de recherche ou filtre.
        </Typography>
        {(searchParams.name || searchParams.type) && (
          <Button variant="outlined" onClick={() => window.location.reload()}>
            Réinitialiser la recherche
          </Button>
        )}
      </Box>
    );
  }
  
  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        {displayedPokemon.map((pokemon, index) => {

if (index === displayedPokemon.length - 1) {
            return (
              <Grid item xs={12} sm={6} md={4} xl={3} key={pokemon.id || pokemon.name} ref={lastPokemonRef}>
                <PokemonCard pokemon={pokemon} />
              </Grid>
            );
          }
          return (
            <Grid item xs={12} sm={6} md={4} xl={3} key={pokemon.id || pokemon.name}>
              <PokemonCard pokemon={pokemon} />
            </Grid>
          );
        })}
      </Grid>
      
      {/* Loader pour les chargements additionnels */}
      {(status === 'loading' || isFetchingNextPage) && (
        <Box sx={{ mt: 4 }}>
          <Loader message={isFetchingNextPage ? "Chargement de plus de Pokémon..." : "Chargement initial..."} />
        </Box>
      )}
      
      {/* Bouton "Charger plus" comme alternative à l'infinite scroll */}
      {hasNextPage && !isFetchingNextPage && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            onClick={() => fetchNextPage()}
            size="large"
          >
            Charger plus de Pokémon
          </Button>
        </Box>
      )}
    </>
  );
};

export default PokemonList;