import {User} from "../../../types";
import {Button, Menu, MenuItem} from "@mui/material";
import {Link, NavLink} from "react-router-dom";
import React, {useState} from "react";
import {useAppDispatch} from "../../../app/hooks.ts";
import {logout} from "../../../features/users/usersThunks.ts";
import {unsetUser} from "../../../features/users/usersSlice.ts";
import {toast} from "react-toastify";

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const [userOptionsEl, setUserOptionsEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setUserOptionsEl(event.currentTarget);
    };

    const handleClose = () => {
        setUserOptionsEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        dispatch(unsetUser());
        handleClose();
        toast.success("Logout successfully");
    };

    return (
        <>
            <Button onClick={handleClick} color="inherit">
                Hello, {user.username}!
            </Button>
            <Menu
                anchorEl={userOptionsEl}
                open={Boolean(userOptionsEl)}
                onClose={handleClose}
                keepMounted
            >
                {user.role === 'admin' && (
                    <MenuItem onClick={handleClose}>
                        <Button component={NavLink} to="/admin">Admin</Button>
                    </MenuItem>
                )}
                <MenuItem onClick={handleClose}>
                    <Button component={NavLink} to="/trackHistory">Track History</Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Button component={Link} to="/new-artist">Add Artist</Button>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;