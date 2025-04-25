import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchArtists} from "./artistSlice";
import {Card, CardMedia, CardContent, Typography, Box} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {Link} from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Artist} from "../../types";

const ArtistList = () => {
    const dispatch = useAppDispatch();
    const { artists, loading } = useAppSelector((state) => state.artists);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    if (loading) return <Spinner />;

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
                Artists
            </Typography>
            <Grid container spacing={3}>
                {artists.map((artist: Artist) => (
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={artist._id}>
                        <Card component={Link} to={`/artists/${artist._id}`}
                              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {artist.image && (
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`http://localhost:8000/${artist.image}`}
                                    alt={artist.artist_name}
                                    sx={{ objectFit: 'cover' }}
                                />
                            )}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {artist.artist_name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ArtistList;