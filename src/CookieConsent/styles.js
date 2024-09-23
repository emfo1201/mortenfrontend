import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  snackbar: {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[3],
    color: theme.palette.text.primary,
  },
}));

export default useStyles;
