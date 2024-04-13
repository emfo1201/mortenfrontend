import React, {useEffect, useState} from 'react'
import { Navigate, useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core"
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import Skeleton from '@material-ui/lab/Skeleton'
import { getPlayers } from "../actions/players"
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    div: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    root: {
        width: 200,
        margin: 10
    },
    media: {
        width: 'fill',
        paddingTop: '2%',
    },
}))

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function ListView(props) {
    let { name } = useParams()
    const { loading = false } = props
    const dispatch = useDispatch()
    const classes = useStyles()
    const player = useSelector((state) => state.players)
    const query = useQuery()
    const searchQuery = query.get('searchQuery')
    const [categories, setCategories] = useState([name.split('&')[0], name.split('&')[1]])
    const history = useNavigate()

    if(!name) {
        return (
            <Navigate to={{ pathname: "/404" }}/>
        )
    }

    return(
        <div className={classes.div}>
            <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Card key={player._id} className={classes.root}>
                    <CardActionArea component={Link} to={"/playerview" + player._id}>

                        <CardHeader
                            title={loading ?
                                <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                             : ( player.name )}
                            subheader={loading ? <Skeleton animation="wave" height={10} width="40%" />
                             : ( player.club )}
                        />
                    </CardActionArea>
                </Card>
            ))
            </Grid>

        </div>
    )
}



export default ListView