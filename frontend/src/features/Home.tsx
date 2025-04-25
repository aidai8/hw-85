import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {Card, CardMedia, CardContent, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {Link} from "react-router-dom";
import Spinner from "../components/UI/Spinner/Spinner.tsx";
import {fetchArtists} from "./artists/artistSlice.ts";
import {Artist} from "../types";

const Home = () => {
    const dispatch = useAppDispatch();
    const {artists, loading} = useAppSelector((state) => state.artists);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    if (loading) return <Spinner/>;

    return (
        <Grid container spacing={3}>
            {artists.map((artist: Artist) => (
                <Grid key={artist._id} size={{xs: 12, sm: 6, md: 4}}>
                    <Card component={Link} to={`/artists/${artist._id}`}>
                        {artist.image && (
                            <CardMedia
                                component="img"
                                height="200"
                                image={`http://localhost:8000/${artist.image}`}
                                alt={artist.artist_name}
                            />
                        )}
                        <CardContent>
                            <Typography variant="h5">{artist.artist_name}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Home;