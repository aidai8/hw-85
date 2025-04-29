import {User} from "../../../types";
import {Button, Menu, MenuItem} from "@mui/material";
import {NavLink} from "react-router-dom";
import React, {useState} from "react";

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button onClick={handleClick} color="inherit">
                Hello, {user.username}!
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>
                    <Button component={NavLink} to="/trackHistory" onClick={handleClose}>
                        Track History
                    </Button>
                </MenuItem>
                <MenuItem>
                    <Button component={NavLink} to="/logout" onClick={handleClose}>
                        Logout
                    </Button>
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;