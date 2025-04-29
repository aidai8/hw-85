import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Alert} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner";
import {selectUser} from "../users/usersSlice";
import {fetchTrackHistory} from "./trackHistorySlice";

const TrackHistory = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const {items, loading, error} = useAppSelector(state => state.trackHistory);

    useEffect(() => {
        if (user) {
            dispatch(fetchTrackHistory());
        }
    }, [dispatch, user]);

    if (!user) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Alert severity="warning">
                    Please login to view your track history!
                </Alert>
            </Box>
        );
    }

    if (loading) return <Spinner />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{p: 3}}>
            <Typography variant="h4" gutterBottom sx={{mb: 3}}>
                Your Listening History
            </Typography>

            {items.length === 0 ? (
                <Typography variant="body1">No tracks played yet</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'background.default' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Artist</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Track</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Played at</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.track.album.artist.artist_name}</TableCell>
                                    <TableCell>{item.track.track_name}</TableCell>
                                    <TableCell>
                                        {new Date(item.datetime).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default TrackHistory;