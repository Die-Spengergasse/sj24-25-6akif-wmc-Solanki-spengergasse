'use client';

import { useReducer, useState } from "react";
import { TodoItem } from "../types/TodoItem";
import { Category } from "../types/Category";
import styles from "./style.module.css";
import TodosDelete from './TodosDelete';

type Props = {
    todoItems: TodoItem[];
    categories: Category[];
};

type TodosClientState =
    | { action: "" }
    | { action: "error"; error: string }
    | { action: "delete"; todoItem: TodoItem };

export type ReducerAction =
    | { intent: "" }
    | { intent: "delete"; todoItem: TodoItem }
    | { intent: "error"; error: string };

function reducer(state: TodosClientState, action: ReducerAction): TodosClientState {
    if (action.intent === "delete") return { action: "delete", todoItem: action.todoItem };
    if (action.intent === "error") return { action: "error", error: action.error };
    return { action: "" };
}

export default function TodosClient({ todoItems, categories }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [state, dispatcher] = useReducer(reducer, { action: "" });

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const filteredTodoItems = selectedCategory
        ? todoItems.filter(item => item.categoryName === selectedCategory)
        : todoItems;

    return (
        <div className={styles.categories}>
            <h1>Todo Liste</h1>
            <select onChange={handleCategoryChange}>
                <option value="">Alle Kategorien</option>
                {categories.map(category => (
                    <option key={category.guid} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>

            <ul>
                {filteredTodoItems.map(item => (
                    <li key={item.guid}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <button onClick={() => dispatcher({ intent: "delete", todoItem: item })}>
                            Löschen
                        </button>
                    </li>
                ))}
            </ul>

            {state.action === "delete" && (
                <TodosDelete todoItem={state.todoItem} dispatcher={dispatcher} />
            )}

            {state.action === "error" && <p style={{ color: "red" }}>{state.error}</p>}
        </div>
    );
}
