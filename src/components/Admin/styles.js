import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Centrera både vertikalt och horisontellt
    height: '100vh',
    width: '200vh'
  },
  button: {
    margin: theme.spacing(2),
    padding: theme.spacing(1, 3), // Lägg till padding för att göra knapparna snyggare
  },
  // Lägg till fler stilar efter behov
}));

export default useStyles;