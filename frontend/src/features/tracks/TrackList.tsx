import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTracks } from "./trackSlice";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    IconButton
} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Spinner from "../../components/UI/Spinner/Spinner";
import { Album } from "../../types";
import {selectUser} from "../users/usersSlice.ts";
import axiosApi from "../../axiosApi.ts";

const TrackList = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { tracks, loading, error } = useAppSelector((state) => state.tracks);
    const album = useAppSelector((state) =>
        state.albums.albums.find((a: Album) => a._id === id)
    );
    const user = useAppSelector(selectUser);

    const handlePlay = async (trackId: string) => {
        if (!user) return;

        try {
            await axiosApi.post('/trackHistories', {track: trackId}, {
                headers: {'Authorization': user.token}
            });
        } catch (error) {
            console.error('Failed to add track to history:', error);
        }
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchTracks(id));
        }
    }, [dispatch, id]);

    if (loading) return <Spinner />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h3" gutterBottom>
                {album?.album_name || 'Album'}
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                {typeof album?.artist === 'object' ? album.artist.artist_name : 'Artist'}
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>#</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Track Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Duration</TableCell>
                            {user && <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Play</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tracks.map((track) => (
                            <TableRow key={track._id}>
                                <TableCell>{track.number}</TableCell>
                                <TableCell>{track.track_name}</TableCell>
                                <TableCell>{track.duration}</TableCell>
                                {user && (
                                    <TableCell>
                                        <IconButton onClick={() => handlePlay(track._id)}>
                                            <PlayArrowIcon />
                                        </IconButton>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TrackList;