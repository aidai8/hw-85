import {useState, useCallback} from "react";
import {useAppDispatch} from "../../app/hooks";
import {createArtist} from "./artistSlice";
import {useNavigate} from "react-router-dom";
import {Box, Typography, TextField, Button, Container, Card, CardContent, Input, FormControl, InputLabel} from "@mui/material";

const ArtistForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        artist_name: "",
        description: "",
    });
    const [image, setImage] = useState<File | null>(null);

    const inputChangeHandler = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        },
        []
    );

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("artist_name", state.artist_name);
        formData.append("description", state.description);
        if (image) {
            formData.append("image", image);
        }

        try {
            await dispatch(createArtist(formData)).unwrap();
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add New Artist
                </Typography>
                <Card>
                    <CardContent>
                        <form onSubmit={submitFormHandler}>
                            <TextField
                                fullWidth
                                label="Artist Name"
                                name="artist_name"
                                value={state.artist_name}
                                onChange={inputChangeHandler}
                                margin="normal"
                                required
                            />

                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Description"
                                name="description"
                                value={state.description}
                                onChange={inputChangeHandler}
                                margin="normal"
                            />

                            <FormControl fullWidth margin="normal">
                                <InputLabel htmlFor="image">Artist Image</InputLabel>
                                <Input
                                    id="image"
                                    type="file"
                                    inputProps={{ accept: "image/*" }}
                                    onChange={fileInputChangeHandler}
                                />
                            </FormControl>

                            <Box sx={{ mt: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Create Artist
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default ArtistForm;