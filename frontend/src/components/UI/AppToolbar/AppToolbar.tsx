import { AppBar, Toolbar, Button, Typography, IconButton } from '@mui/material';
import {Link} from 'react-router-dom';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const AppToolbar = () => {
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="music-app"
                    sx={{ mr: 2 }}
                    component={Link}
                    to="/"
                >
                    <MusicNoteIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, fontFamily: 'monospace', fontWeight: 700 }}
                >
                    Music Catalog
                </Typography>

                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    sx={{ textTransform: 'none', fontSize: '1rem' }}
                >
                    All Artists
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;