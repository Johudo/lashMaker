import { LINK_STRUCTURE } from "@/config";
import { Button, Container, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import base64 from "base-64";

export const AUTH_TOKEN_KEY = "token";
const savedToken = window.localStorage.getItem(AUTH_TOKEN_KEY);

axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    Authorization: base64.decode(savedToken || ""),
};

export const RequiredAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!savedToken) {
            navigate(LINK_STRUCTURE.Login);
        }
    }, [navigate]);

    if (!savedToken) {
        return null;
    }

    const handleLogoutClick = () => {
        window.localStorage.removeItem(AUTH_TOKEN_KEY);
        window.location.reload();
    };

    return (
        <>
            <Container padding="0.5rem 0">
                <Flex justifyContent="flex-end">
                    <Button variant="ghost" marginLeft="auto" onClick={handleLogoutClick}>
                        Выйти
                    </Button>
                </Flex>
            </Container>
            <Outlet />;
        </>
    );
};
