import { axiosInstance, createErrorResponse, ErrorResponse } from '@/utils/apiClient';

export type TodoItem = {
  guid: string;
  title: string;
  description: string;
  categoryGuid: string;
  categoryName: string;
  categoryPriority: string;
  categoryIsVisible: boolean;
  isCompleted: boolean;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function getTodoItems(): Promise<TodoItem[] | ErrorResponse> {
  try {
    const response = await axiosInstance.get<TodoItem[]>('api/TodoItems');
    return response.data;
  } catch (error) {
    return createErrorResponse(error);
  }
}
