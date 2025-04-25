import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {Card, CardMedia, CardContent, Typography, Box} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Link} from "react-router-dom";
import {fetchAlbums} from "../albums/albumSlice.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {Album} from "../../types";
import {selectArtistById} from "./artistSlice.ts";

const Artist = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { albums, loading } = useAppSelector((state) => state.albums);
    const artist = useAppSelector(selectArtistById(id || ''));

    useEffect(() => {
        if (id) dispatch(fetchAlbums(id));
    }, [dispatch, id]);

    if (loading) return <Spinner/>;

    return (
        <Box sx={{p: 2}}>
            <Typography variant="h3" gutterBottom sx={{mb: 4}}>
                {artist?.artist_name || 'Artist'}
            </Typography>
            <Grid container spacing={3}>
                {albums.map((album: Album) => (
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={album._id}>
                        <Card component={Link} to={`/albums/${album._id}`}
                              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {album.image && (
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`http://localhost:8000/${album.image}`}
                                    alt={album.album_name}
                                    sx={{ objectFit: 'cover' }}
                                />
                            )}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {album.album_name}
                                </Typography>
                                <Typography color="text.secondary">
                                    {album.year}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Artist;