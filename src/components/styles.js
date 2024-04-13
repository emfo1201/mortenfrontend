import { makeStyles } from '@material-ui/core/styles'


export default makeStyles((theme) => ({
    div: {
        flexGrow: 1,
        marginTop: 50,
    },
    root: {
        minWidth: 100,
        maxWidth: 300,
        flex: 'center',
        border: "none",
        boxShadow: "none"
    },
    media: {
        maxHeight: 450,
        minHeight: 200,
        paddingTop: '2%',

    },
    typography: {
        paddingTop: 10
    },
    imageRoot: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    imageList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
}))