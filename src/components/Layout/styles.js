import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    hero: {
        display: 'flex',
        height: '100vh', // 100% of the viewport height
        overflow: 'hidden',
      },
      heroImageContainer: {
        flex: '1',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'flex-end', // Align to the right
        alignItems: 'flex-start', // Align to the top
      },
      heroImage: {
        maxWidth: '90%', // Adjust the maximum width as needed
        height: 'auto', // Maintain aspect ratio
        objectFit: 'contain',
        display: 'block',
      },
      heroContentContainer: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.common.white,
      },
      heroContent: {
        textAlign: 'center',
      },
      heroWelcome: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
      },
      heroCTA: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
  featuredCollection: {
    // Featured collection styles
  },
  aboutCollector: {
    // About collector styles
  },
  collectionCategories: {
    // Collection categories styles
  },
  testimonials: {
    // Testimonials styles
  },
  newsletter: {
    // Newsletter styles
  },
  socialMedia: {
    // Social media styles
  },
  contact: {
    // Contact information styles
  },
}));

export default useStyles;