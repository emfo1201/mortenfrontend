import { makeStyles } from "@mui/styles"

export default makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        width: '33%',
        float: 'left'
    },
    flexContainer: {
        width: "100%",
        display: "inline-block"
    }
}))