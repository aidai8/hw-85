import React, {useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {Avatar, Box, Button, Link, TextField, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {RegisterMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectRegisterError, selectRegisterLoading} from "./usersSlice";
import {register} from "./usersThunks";
import {toast} from "react-toastify";

const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const registerLoading = useAppSelector(selectRegisterLoading);
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterMutation>({
        username: '',
        password: '',
    });

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch (e) {
            return;
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };

    const onSubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(register(form)).unwrap();
            navigate("/");
            toast.success("Registration successful");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmitFormHandler} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid size={{xs: 12}}>
                        <TextField
                            disabled={registerLoading}
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={form.username}
                            onChange={onInputChange}
                            helperText={getFieldError('username')}
                            error={Boolean(getFieldError('username'))}
                        />
                    </Grid>
                    <Grid size={{xs: 12}}>
                        <TextField
                            disabled={registerLoading}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={form.password}
                            onChange={onInputChange}
                            helperText={getFieldError('password')}
                            error={Boolean(getFieldError('password'))}
                        />
                    </Grid>
                </Grid>
                <Button
                    disabled={registerLoading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="space-between">
                    <Grid sx={{mx: 'auto'}}>
                        <Link to="/login" variant="body2" component={RouterLink}>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Register;