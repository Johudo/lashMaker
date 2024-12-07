import { TServicesItem } from "@/requests/services/types";
import { Flex, IconButton, Table } from "@chakra-ui/react";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { EditingTableRow } from "../EditingTableRow";
import { useDeleteEditServicesMutation } from "@/requests/services/hooks";
import {
    DialogActionTrigger,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";
import { useQueryClient } from "@tanstack/react-query";

export type InfoTableRowProps = { data: TServicesItem };

export const InfoTableRow = ({ data }: InfoTableRowProps) => {
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);

    const { mutate: deleteMutate } = useDeleteEditServicesMutation();

    if (isEditing) {
        return (
            <EditingTableRow
                initialData={data}
                onRowSaved={() => setIsEditing(false)}
                onRowEditCanceled={() => setIsEditing(false)}
            />
        );
    }

    const handleDeleteClick = () => {
        deleteMutate(
            { id: data.id },
            {
                onSuccess: () => {
                    toaster.create({ title: "Услуга удалена!", type: "success" });
                    queryClient.invalidateQueries({ queryKey: ["services"] });
                },
                onError: (error) => {
                    toaster.create({ title: "Ошибка удаления", description: error.message, type: "error" });
                },
            }
        );
    };

    return (
        <Table.Row>
            <Table.ColumnHeader>{data.id}</Table.ColumnHeader>
            <Table.ColumnHeader>{data.title}</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">{data.priceMasterBefore}</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">{data.priceMasterCurrent}</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">{data.priceTopBefore}</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">{data.priceTopCurrent}</Table.ColumnHeader>
            <Table.ColumnHeader>{data.sort}</Table.ColumnHeader>

            <Table.ColumnHeader textAlign="center">
                <Flex gap={3} justifyContent="center">
                    <IconButton size="xs" variant="subtle" onClick={() => setIsEditing(true)}>
                        <FontAwesomeIcon icon={faPen} />
                    </IconButton>

                    <DialogRoot role="alertdialog">
                        <DialogTrigger asChild>
                            <IconButton size="xs" variant="subtle" colorPalette="red">
                                <FontAwesomeIcon icon={faTrash} />
                            </IconButton>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Удалить элемент?</DialogTitle>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogActionTrigger asChild>
                                    <Button variant="outline">Отмена</Button>
                                </DialogActionTrigger>
                                <DialogActionTrigger asChild>
                                    <Button colorPalette="red" onClick={handleDeleteClick}>
                                        Удалить
                                    </Button>
                                </DialogActionTrigger>
                            </DialogFooter>
                            <DialogCloseTrigger />
                        </DialogContent>
                    </DialogRoot>
                </Flex>
            </Table.ColumnHeader>
        </Table.Row>
    );
};
