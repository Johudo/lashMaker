import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import { useContactsQuery, useEditContactsMutation } from "@/requests/contacts/hooks";
import { TContacts } from "@/requests/contacts/types";
import { Button, Input } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const formScheme: Record<keyof TContacts, { title: string }> = {
    avito: { title: "Ссылка на авито" },
    instagram: { title: "Ссылка на instagram" },
    whatsapp: { title: "Ссылка на whatsapp" },
    yandexMap: { title: "Ссылка на яндекс карты" },
    phone: { title: "Телефон" },
};

export const ContactsForm = () => {
    const [formData, setFormData] = useState<Partial<TContacts> | undefined>(undefined);

    const queryClient = useQueryClient();
    const { data } = useContactsQuery();
    const { mutate } = useEditContactsMutation();

    const handleChange = <K extends keyof TContacts>(key: K, newValue: TContacts[K]) => {
        setFormData((prev) => ({ ...prev, [key]: newValue }));
    };

    const handleSubmit = () => {
        if (!formData) {
            return;
        }

        mutate(
            { data: formData },
            {
                onSuccess: () => {
                    toaster.create({ title: "Контакты сохранены!", type: "success" });
                    queryClient.invalidateQueries({ queryKey: ["contacts"] });
                    setFormData(undefined);
                },
                onError: (error) => {
                    toaster.create({ title: "Ошибка сохранения", description: error.message, type: "error" });
                },
            }
        );
    };

    return (
        <>
            {Object.keys(formScheme).map((key) => (
                <Field key={key} label={formScheme[key as keyof TContacts].title}>
                    <Input
                        value={formData?.[key as keyof TContacts] || data?.data?.[key as keyof TContacts] || ""}
                        onChange={(e) => handleChange(key as keyof TContacts, e.target.value)}
                        borderColor={key in (formData || {}) ? "border.info" : undefined}
                    />
                </Field>
            ))}

            <Button variant="subtle" alignSelf="self-start" disabled={!formData} onClick={handleSubmit}>
                Сохранить
            </Button>
        </>
    );
};
