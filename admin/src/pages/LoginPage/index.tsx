import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { AUTH_TOKEN_KEY } from "@/helpers/RequiredAuth";
import { useLoginMutation } from "@/requests/login/hooks";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import base64 from "base-64";
import { LINK_STRUCTURE } from "@/config";

export const LoginPage = () => {
    const [password, setPassword] = useState("");

    const { mutate: login } = useLoginMutation();

    const handleLoginClick = () => {
        login(
            { data: { password } },
            {
                onSuccess: () => {
                    toaster.create({ title: "Успешно", type: "success" });
                    window.localStorage.setItem(AUTH_TOKEN_KEY, base64.encode(password));
                    window.location.href = LINK_STRUCTURE.Index;
                },
                onError: (error) => {
                    toaster.create({ title: "Ошибка входа", description: error.message, type: "error" });
                },
            }
        );
    };

    return (
        <Container padding="4rem 0">
            <Flex gap={8} direction="column" margin="0 auto" maxWidth="30rem">
                <Heading size="4xl">Вход:</Heading>

                <Field label="Пароль">
                    <PasswordInput
                        placeholder="Введи пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Field>

                <Button onClick={handleLoginClick}>Войти</Button>
            </Flex>
        </Container>
    );
};
