import { toaster } from "@/components/ui/toaster";
import { useCreateEditServicesMutation } from "@/requests/services/hooks";
import { TServicesItem } from "@/requests/services/types";
import { Flex, IconButton, Input, Table } from "@chakra-ui/react";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export type EditingTableRowProps = {
    initialData?: TServicesItem | undefined;
    onRowSaved?: () => void;
    onRowEditCanceled?: () => void;
};

export const EditingTableRow = ({ initialData, onRowSaved, onRowEditCanceled }: EditingTableRowProps) => {
    const queryClient = useQueryClient();
    const { mutate } = useCreateEditServicesMutation();

    const [rowData, setRowData] = useState({
        title: initialData?.title.toString() || "",
        priceMasterBefore: initialData?.priceMasterBefore.toString() || (!initialData ? " ₽" : ""),
        priceMasterCurrent: initialData?.priceMasterCurrent.toString() || (!initialData ? " ₽" : ""),
        priceTopBefore: initialData?.priceTopBefore.toString() || (!initialData ? " ₽" : ""),
        priceTopCurrent: initialData?.priceTopCurrent.toString() || (!initialData ? " ₽" : ""),
        sort: initialData?.sort.toString() || "",
    });

    const handleChange = <K extends keyof typeof rowData>(key: K, newValue: (typeof rowData)[K]) => {
        setRowData((prev) => ({ ...prev, [key]: newValue }));
    };

    const handleSaveClick = () => {
        mutate(
            { id: initialData?.id || undefined, data: { ...rowData, sort: Number(rowData.sort) || 500 } },
            {
                onSuccess: () => {
                    toaster.create({ title: "Услуга сохранена!", type: "success" });
                    onRowSaved?.();
                    queryClient.invalidateQueries({ queryKey: ["services"] });
                },
                onError: (error) => {
                    toaster.create({ title: "Ошибка сохранения", description: error.message, type: "error" });
                },
            }
        );
    };

    return (
        <Table.Row>
            <Table.ColumnHeader padding={0}></Table.ColumnHeader>
            <Table.ColumnHeader padding={0}>
                <Input value={rowData.title} onChange={(e) => handleChange("title", e.target.value)} border={0} />
            </Table.ColumnHeader>
            <Table.ColumnHeader padding={0}>
                <Input
                    value={rowData.priceMasterBefore}
                    onChange={(e) => handleChange("priceMasterBefore", e.target.value)}
                    border={0}
                />
            </Table.ColumnHeader>
            <Table.ColumnHeader padding={0}>
                <Input
                    value={rowData.priceMasterCurrent}
                    onChange={(e) => handleChange("priceMasterCurrent", e.target.value)}
                    border={0}
                />
            </Table.ColumnHeader>
            <Table.ColumnHeader padding={0}>
                <Input
                    value={rowData.priceTopBefore}
                    onChange={(e) => handleChange("priceTopBefore", e.target.value)}
                    border={0}
                />
            </Table.ColumnHeader>
            <Table.ColumnHeader padding={0}>
                <Input
                    value={rowData.priceTopCurrent}
                    onChange={(e) => handleChange("priceTopCurrent", e.target.value)}
                    border={0}
                />
            </Table.ColumnHeader>
            <Table.ColumnHeader padding={0}>
                <Input
                    value={rowData.sort}
                    onChange={(e) => handleChange("sort", e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSaveClick();
                        }
                    }}
                    border={0}
                />
            </Table.ColumnHeader>

            <Table.ColumnHeader textAlign="center">
                <Flex gap={3} justifyContent="center">
                    <IconButton size="xs" onClick={handleSaveClick}>
                        <FontAwesomeIcon icon={faCheck} />
                    </IconButton>
                    <IconButton size="xs" variant="subtle" colorPalette="gray" onClick={onRowEditCanceled}>
                        <FontAwesomeIcon icon={faClose} />
                    </IconButton>
                </Flex>
            </Table.ColumnHeader>
        </Table.Row>
    );
};
