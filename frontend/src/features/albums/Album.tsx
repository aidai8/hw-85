import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTracks} from "../tracks/trackSlice";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Track} from "../../types";
import {selectAlbumById} from "./albumSlice.ts";

const Album = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const {tracks, loading} = useAppSelector((state) => state.tracks);
    const album = useAppSelector(selectAlbumById(id || ''));

    useEffect(() => {
        if (id) dispatch(fetchTracks(id));
    }, [dispatch, id]);

    if (loading) return <Spinner/>;

    return (
        <Box sx={{p: 2}}>
            <Typography variant="h3" gutterBottom>
                {album?.album_name || 'Album'}
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                {album?.artist.artist_name || 'Artist'}
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Track Name</TableCell>
                            <TableCell>Duration</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tracks.map((track: Track) => (
                            <TableRow key={track._id}>
                                <TableCell>{track.number}</TableCell>
                                <TableCell>{track.track_name}</TableCell>
                                <TableCell>{track.duration}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Album;