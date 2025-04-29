import {AppBar, Toolbar, Typography, IconButton, styled, Container} from '@mui/material';
import {NavLink} from 'react-router-dom';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../../features/users/usersSlice.ts";
import UserMenu from "./UserMenu.tsx";
import AnonymousMenu from "./AnonymousMenu.tsx";

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    },
});


const AppToolbar = () => {
    const user = useAppSelector(selectUser);

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Container>
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

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/">Music Catalog</Link>
                </Typography>
                {user ? <UserMenu user={user} /> : <AnonymousMenu />}
            </Toolbar>
            </Container>
        </AppBar>
    );
};

export default AppToolbar;