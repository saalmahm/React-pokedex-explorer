import { Container, Typography, Paper, Box, Link, Divider, Grid, Card, CardContent, CardMedia } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

const AboutPage = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CatchingPokemonIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            À propos du Pokédex
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          Bienvenue dans mon application Pokédex ! Cette application a été créée pour permettre aux fans de Pokémon d'explorer et de découvrir les caractéristiques de tous les Pokémon dans un format facile à utiliser et visuellement attrayant.
        </Typography>

        <Typography variant="body1" paragraph>
          Notre Pokédex utilise les données de la {' '}
          <Link href="https://pokeapi.co/" target="_blank" rel="noopener">
            PokéAPI
          </Link>
          , une API RESTful complète qui fournit toutes les informations sur l'univers Pokémon.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          Technologies utilisées
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CodeIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Frontend</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  React, React Router pour la navigation entre les pages
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DataObjectIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Gestion des données</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  React Query pour les requêtes et la mise en cache des données
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DesignServicesIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Interface</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Material UI pour les composants et le design responsive
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom>
          Fonctionnalités
        </Typography>

        <Typography variant="body1" component="ul" sx={{ pl: 2 }}>
          <li>Recherche de Pokémon par nom ou type</li>
          <li>Affichage des détails complets de chaque Pokémon</li>
          <li>Visualisation des statistiques, évolutions et attaques</li>
          <li>Navigation intuitive entre les Pokémon</li>
          <li>Interface responsive adaptée à tous les appareils</li>
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
        © 2025 Pokédex App. Tous droits réservés.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;