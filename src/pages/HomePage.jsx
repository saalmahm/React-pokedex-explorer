import { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import SearchBar from '../components/common/SearchBar';
import PokemonList from '../components/pokemon/PokemonList';

const HomePage = () => {
  const [searchParams, setSearchParams] = useState({ name: '', type: '' });

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          Pokédex
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Explorez le monde des Pokémon et découvrez toutes leurs caractéristiques
        </Typography>
        
        <SearchBar onSearch={handleSearch} />
      </Box>
      
      <PokemonList searchParams={searchParams} />
    </Container>
  );
};

export default HomePage;