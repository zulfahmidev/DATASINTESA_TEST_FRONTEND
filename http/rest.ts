export interface APIResponse {
    status: number
    message: string;
    body: any;
}

export interface PaginatedResponse<T> {
    items: T[];
    pagination: {
        total_items: number;
        items_per_page: number;
        total_pages: number;
        current_page: number;
    };
}
