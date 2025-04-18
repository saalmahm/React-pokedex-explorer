import { useState } from 'react';
import { Paper, InputBase, IconButton, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import { getPokemonTypes } from '../../api/pokeApi';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const { data: types = [] } = useQuery({
    queryKey: ['pokemonTypes'],
    queryFn: getPokemonTypes,
    staleTime: Infinity 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ name: searchTerm, type: selectedType });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value === '') {
      onSearch({ name: '', type: selectedType });
    }
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    onSearch({ name: searchTerm, type: e.target.value });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Paper 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          p: '2px 4px', 
          display: 'flex',
          alignItems: 'center', 
          width: '100%',
          maxWidth: 600,
          mx: 'auto', 
          mb: 2,
          boxShadow: 2
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Rechercher un Pokémon..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      
      <FormControl variant="outlined" sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
        <InputLabel id="type-select-label">Filtrer par type</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={selectedType}
          onChange={handleTypeChange}
          label="Filtrer par type"
          sx={{ width: '100%' }}
        >
          <MenuItem value="">
            <em>Tous les types</em>
          </MenuItem>
          {types.map((type) => (
            <MenuItem key={type.name} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchBar;