import {Container, CssBaseline, Typography} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Home from "./features/Home.tsx";
import Artist from "./features/artists/Artist.tsx";
import Album from "./features/albums/Album.tsx";
import TrackList from "./features/tracks/TrackList.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import TrackHistory from "./features/trackHistory/TrackHistory.tsx";


const App = () => {

  return (
      <>
          <CssBaseline />
          <ToastContainer />
          <header>
              <AppToolbar />
          </header>
          <main>
              <Container maxWidth="xl" sx={{py: 3}}>
                  <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/artists/:id" element={<Artist/>}/>
                      <Route path="/albums/:id" element={<Album/>}/>
                      <Route path="/albums/:id/tracks" element={<TrackList/>}/>
                      <Route path="/login" element={<Login/>} />
                      <Route path="/register" element={<Register/>} />
                      <Route path="/trackHistory" element={<TrackHistory/>}/>
                      <Route path="*" element={<Typography variant="h4">Not found page</Typography>} />
                  </Routes>
              </Container>
          </main>
      </>
  );
};

export default App;
