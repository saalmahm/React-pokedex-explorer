import { Box, Typography, LinearProgress } from '@mui/material';

// Map des couleurs pour les statistiques
const statColors = {
  hp: '#FF5959',
  attack: '#F5AC78',
  defense: '#FAE078',
  'special-attack': '#9DB7F5',
  'special-defense': '#A7DB8D',
  speed: '#FA92B2'
};

// Map des noms en français
const statNames = {
  hp: 'PV',
  attack: 'Attaque',
  defense: 'Défense',
  'special-attack': 'Attaque Spé.',
  'special-defense': 'Défense Spé.',
  speed: 'Vitesse'
};

const PokemonStats = ({ stats }) => {
  // Maximum possible stat value for the progress bar (255 is the theoretical max)
  const maxStatValue = 255;

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Statistiques de base
      </Typography>
      
      {stats.map((stat) => {
        const statName = stat.stat.name;
        const value = stat.base_stat;
        const percentage = (value / maxStatValue) * 100;
        
        return (
          <Box key={statName} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {statNames[statName] || statName}
              </Typography>
              <Typography variant="body2">
                {value} / {maxStatValue}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: statColors[statName] || '#999',
                  borderRadius: 5,
                }
              }}
            />
          </Box>
        );
      })}
      
      {/* Calcul et affichage du total des stats */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', bgcolor: 'background.paper', p: 1, borderRadius: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Total
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {stats.reduce((total, stat) => total + stat.base_stat, 0)}
        </Typography>
      </Box>
    </Box>
  );
};

export default PokemonStats;