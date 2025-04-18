import { Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorMessage = ({ message = 'Une erreur est survenue.', onRetry }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 500,
        mx: 'auto',
        backgroundColor: '#fff8f8',
        borderLeft: '4px solid #f44336'
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h5" component="h2" gutterBottom>
        Oups !
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" gutterBottom>
        {message}
      </Typography>
      {onRetry && (
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={onRetry}
            sx={{ mt: 2 }}
          >
            Réessayer
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default ErrorMessage;