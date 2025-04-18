import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await apiClient.get(`/pokemon`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la liste de Pokémon:', error);
    throw error;
  }
};

export const getPokemonDetails = async (idOrName) => {
  try {
    const response = await apiClient.get(`/pokemon/${idOrName}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des détails du Pokémon ${idOrName}:`, error);
    throw error;
  }
};

export const getPokemonSpecies = async (idOrName) => {
  try {
    const response = await apiClient.get(`/pokemon-species/${idOrName}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des informations sur l'espèce du Pokémon ${idOrName}:`, error);
    throw error;
  }
};

export const getEvolutionChain = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la chaîne d\'évolution:', error);
    throw error;
  }
};

export const searchPokemon = async (name) => {
  try {
    const response = await apiClient.get(`/pokemon/${name.toLowerCase()}`);
    return [response.data];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    console.error(`Erreur lors de la recherche du Pokémon ${name}:`, error);
    throw error;
  }
};

export const getPokemonTypes = async () => {
  try {
    const response = await apiClient.get('/type');
    return response.data.results;
  } catch (error) {
    console.error('Erreur lors de la récupération des types de Pokémon:', error);
    throw error;
  }
};