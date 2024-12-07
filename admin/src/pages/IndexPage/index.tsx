import { useServicesQuery } from "@/requests/services/hooks";
import { Button, Container, Flex, Heading, Separator, Table } from "@chakra-ui/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { uniqueId } from "lodash";
import { useState } from "react";
import { EditingTableRow } from "./EditingTableRow";
import { InfoTableRow } from "./InfoTableRow";
import { ContactsForm } from "./ContactsForm";

export const IndexPage = () => {
    const [newRowsMap, setNewRowsMap] = useState<Record<string, string>>({});

    const { data } = useServicesQuery();

    const deleteNewRow = (key: string) => {
        setNewRowsMap((prev) => {
            const newValue = { ...prev };
            delete newValue[key];
            return newValue;
        });
    };

    return (
        <Container padding="4rem 0">
            <Flex direction="column" gap={8}>
                <Flex direction="column" gap={4}>
                    <Heading size="2xl">Услуги</Heading>

                    <Table.Root size="sm" variant="outline" showColumnBorder stickyHeader>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader rowSpan={2}>ID</Table.ColumnHeader>
                                <Table.ColumnHeader rowSpan={2}>Название</Table.ColumnHeader>
                                <Table.ColumnHeader colSpan={2} textAlign="center">
                                    Мастер
                                </Table.ColumnHeader>
                                <Table.ColumnHeader colSpan={2} textAlign="center">
                                    Топ-мастер
                                </Table.ColumnHeader>
                                <Table.ColumnHeader rowSpan={2}>Сортировка</Table.ColumnHeader>
                                <Table.ColumnHeader rowSpan={2}></Table.ColumnHeader>
                            </Table.Row>
                            <Table.Row>
                                <Table.ColumnHeader textAlign="center">до</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center">текущая</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center">до</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center">текущая</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {[...(data?.data || [])]
                                .sort((a, b) => a.sort - b.sort)
                                .map((item) => (
                                    <InfoTableRow key={item.id} data={item} />
                                ))}

                            {Object.keys(newRowsMap).map((key) => (
                                <EditingTableRow
                                    key={key}
                                    onRowSaved={() => deleteNewRow(key)}
                                    onRowEditCanceled={() => deleteNewRow(key)}
                                />
                            ))}
                        </Table.Body>
                    </Table.Root>

                    <Button
                        size="sm"
                        variant="subtle"
                        alignSelf="self-start"
                        onClick={() => {
                            const newRow = uniqueId("");
                            setNewRowsMap((prev) => ({ ...prev, [newRow]: newRow }));
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} style={{ flexShrink: 0 }} />
                        <span>Добавить</span>
                    </Button>
                </Flex>

                <Separator />

                <Flex direction="column" gap={4}>
                    <Heading size="2xl">Контакты</Heading>
                    <ContactsForm />
                </Flex>
            </Flex>
        </Container>
    );
};
