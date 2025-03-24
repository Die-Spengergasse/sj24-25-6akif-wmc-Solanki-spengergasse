"use client";

import { ActionDispatch, Dispatch, SetStateAction, useRef, useState } from "react";
import ModalDialog from "../components/ModalDialog";
import { TodoItem } from "../types/TodoItem";
import { deleteTodoItem } from "./todosApiClient";
import { ReducerAction } from "./TodosClient";

type TodosDeleteProps = {
    todoItem: TodoItem;
    dispatcher: ActionDispatch<[ReducerAction]>;
};

async function handleOk(guid: string, deleteTasks: boolean, dispatcher: ActionDispatch<[ReducerAction]>) {
    const error = await deleteTodoItem(guid, deleteTasks);
    if (error) {
        dispatcher({ intent: "error", error: error.message });
    } else {
        dispatcher({ intent: "" });
    }
}

export default function TodosDelete({ todoItem, dispatcher }: TodosDeleteProps) {
    const checkboxRef = useRef<HTMLInputElement>(null);

    return (
        <ModalDialog
            onOk={() => handleOk(todoItem.guid, checkboxRef.current?.checked ?? false, dispatcher)}
            onCancel={() => dispatcher({ intent: "" })}
            title="Delete todo item"
        >
            <p>Soll das Item {todoItem.title} gelöscht werden?</p>
            <p>
                <label>
                    <input ref={checkboxRef} type="checkbox" />
                    Alle verbundenen todo tasks löschen?
                </label>
            </p>
        </ModalDialog>
    );
}
