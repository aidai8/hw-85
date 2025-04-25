import {Container, CssBaseline, Typography} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";


const App = () => {

  return (
    <>
        <CssBaseline />
        <ToastContainer/>
        <header>
            <AppToolbar/>
        </header>
        <main>
          <Container maxWidth="xl">
              <Routes>
                  <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
              </Routes>
          </Container>
        </main>
    </>
  )
};

export default App
