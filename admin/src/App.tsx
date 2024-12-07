import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "@/components/ui/provider";
import { IndexPage } from "@/pages/IndexPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import { LINK_STRUCTURE } from "./config";
import { RequiredAuth } from "./helpers/RequiredAuth";
import { LoginPage } from "./pages/LoginPage";

const queryClient = new QueryClient();

function App() {
    return (
        <Provider>
            <Theme appearance="dark" colorPalette="teal">
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Routes>
                            <Route path={LINK_STRUCTURE.Index}>
                                <Route path={LINK_STRUCTURE.Login} element={<LoginPage />} />

                                <Route path="*" element={<RequiredAuth />}>
                                    <Route index element={<IndexPage />} />
                                </Route>
                            </Route>
                        </Routes>

                        <Toaster />
                    </BrowserRouter>
                </QueryClientProvider>
            </Theme>
        </Provider>
    );
}

export default App;
