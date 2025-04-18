import { Box, Typography, Container, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200]
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' '}
          <Link color="inherit" href="https://pokeapi.co/" target="_blank" rel="noopener">
            Pokédex App
          </Link>
          {' - Propulsé par '}
          <Link color="inherit" href="https://pokeapi.co/" target="_blank" rel="noopener">
            PokéAPI
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;