import {
    BaseRecord,
    DataProvider,
    GetListParams,
    GetListResponse,
} from "@refinedev/core";

const API_URL = "http://localhost:8000";

export const dataProvider: DataProvider = {
    getList: async <
        TData extends BaseRecord = BaseRecord
    >({
        resource,
        pagination,
        filters,
        sorters,
    }: GetListParams): Promise<GetListResponse<TData>> => {
        if (resource === "subjects") {
            try {
                const params = new URLSearchParams();

                if (pagination) {
                    params.append("page", (pagination.current || 1).toString());
                    params.append("limit", (pagination.pageSize || 10).toString());
                }

                const response = await fetch(`${API_URL}/api/subjects?${params.toString()}`);
                if (!response.ok) {
                    const error = new Error(`HTTP error! status: ${response.status}`);
                    (error as any).status = response.status;
                    (error as any).statusCode = response.status;
                    throw error;
                }

                const result = await response.json();
                return {
                    data: result.data as TData[],
                    total: result.pagination?.total || 0,
                };
            } catch (error) {
                console.error("Failed to fetch subjects:", error);
                return {
                    data: [],
                    total: 0,
                };
            }
        }

        if (resource === "users") {
            try {
                const params = new URLSearchParams();

                if (pagination) {
                    params.append("page", (pagination.current || 1).toString());
                    params.append("limit", (pagination.pageSize || 10).toString());
                }

                if (filters) {
                    filters.forEach((filter) => {
                        if (filter.field && filter.value !== undefined) {
                            params.append(filter.field.toString(), filter.value.toString());
                        }
                    });
                }

                const response = await fetch(`${API_URL}/api/users?${params.toString()}`);
                if (!response.ok) {
                    const errorBody = await response.json().catch(() => null);
                    const message = errorBody?.error || `HTTP error! status: ${response.status}`;
                    const error = new Error(message);
                    (error as any).status = response.status;
                    (error as any).statusCode = response.status;
                    throw error;
                }

                const result = await response.json();
                return {
                    data: result.data as TData[],
                    total: result.pagination?.total || 0,
                };
            } catch (error) {
                console.error("Failed to fetch users:", error);
                return {
                    data: [],
                    total: 0,
                };
            }
        }

        if (resource === "classes") {
            try {
                const params = new URLSearchParams();
                
                if (pagination) {
                    params.append("page", (pagination.current || 1).toString());
                    params.append("limit", (pagination.pageSize || 10).toString());
                }

                const response = await fetch(`${API_URL}/api/classes?${params.toString()}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                
                return {
                    data: result.data as TData[],
                    total: result.pagination?.total || 0,
                };
            } catch (error) {
                console.error("Failed to fetch classes:", error);
                return {
                    data: [],
                    total: 0,
                };
            }
        }

        return {
            data: [],
            total: 0,
        };
    },

    getOne: async ({ id, resource }) => {
        if (resource === "subjects") {
            try {
                const response = await fetch(`${API_URL}/api/subjects/${id}`);
                if (!response.ok) {
                    const error = new Error(`HTTP error! status: ${response.status}`);
                    (error as any).status = response.status;
                    (error as any).statusCode = response.status;
                    throw error;
                }
                const result = await response.json();
                return {
                    data: result.data,
                };
            } catch (error) {
                console.error("Failed to fetch subject:", error);
                throw error;
            }
        }

        if (resource === "users") {
            try {
                const response = await fetch(`${API_URL}/api/users/${id}`);
                if (!response.ok) {
                    const error = new Error(`HTTP error! status: ${response.status}`);
                    (error as any).status = response.status;
                    (error as any).statusCode = response.status;
                    throw error;
                }
                const result = await response.json();
                return {
                    data: result.data,
                };
            } catch (error) {
                console.error("Failed to fetch user:", error);
                throw error;
            }
        }

        if (resource === "classes") {
            try {
                const response = await fetch(`${API_URL}/api/classes/${id}`);
                if (!response.ok) {
                    const error = new Error(`HTTP error! status: ${response.status}`);
                    (error as any).status = response.status;
                    (error as any).statusCode = response.status;
                    throw error;
                }
                const result = await response.json();
                return {
                    data: result.data,
                };
            } catch (error) {
                console.error("Failed to fetch class:", error);
                throw error;
            }
        }

        throw new Error("Resource not found");
    },

    create: async ({ resource, variables }) => {
        if (resource === "classes") {
            try {
                const response = await fetch(`${API_URL}/api/classes`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(variables),
                });

                if (!response.ok) {
                    const responseBody = await response.json().catch(() => null);
                    const message =
                        responseBody?.error ||
                        responseBody?.message ||
                        `HTTP error! status: ${response.status}`;
                    const error = new Error(message);
                    (error as any).status = response.status;
                    (error as any).statusCode = response.status;
                    throw error;
                }

                const result = await response.json();
                return {
                    data: result.data,
                };
            } catch (error) {
                console.error("Failed to create class:", error);
                throw error;
            }
        }

        if (resource === "subjects") {
            try {
                const response = await fetch(`${API_URL}/api/subjects`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(variables),
                });

                if (!response.ok) {
                    const responseBody = await response.json().catch(() => null);
                    const message =
                        responseBody?.error ||
                        responseBody?.message ||
                        `HTTP error! status: ${response.status}`;
                    const error = new Error(message);
                    (error as any).status = response.status;
                    (error as any).statusCode = response.status;
                    throw error;
                }

                const result = await response.json();
                return {
                    data: result.data,
                };
            } catch (error) {
                console.error("Failed to create subject:", error);
                throw error;
            }
        }

        if (resource === "users") {
            try {
                const response = await fetch(`${API_URL}/api/users`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(variables),
                });

                if (!response.ok) {
                    const errorBody = await response.json().catch(() => null);
                    const message = errorBody?.error || errorBody?.message || `HTTP error! status: ${response.status}`;
                    const error = new Error(message);
                    (error as any).status = response.status;
                    (error as any).statusCode = response.status;
                    throw error;
                }

                const result = await response.json();
                return { data: result.data };
            } catch (error) {
                console.error("Failed to create user:", error);
                throw error;
            }
        }

        return {
            data: {
                id: Date.now(),
                ...variables,
            },
        };
    },

    update: async ({ id, variables, resource }) => {
        if (resource === "users") {
            const response = await fetch(`${API_URL}/api/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(variables),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => null);
                const message = err?.error || err?.message || `HTTP error! status: ${response.status}`;
                const error = new Error(message);
                (error as any).status = response.status;
                throw error;
            }

            const result = await response.json();
            return { data: result.data };
        }

        if (resource === "subjects") {
            const response = await fetch(`${API_URL}/api/subjects/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(variables),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => null);
                const message = err?.error || err?.message || `HTTP error! status: ${response.status}`;
                const error = new Error(message);
                (error as any).status = response.status;
                throw error;
            }

            const result = await response.json();
            return { data: result.data };
        }

        return { data: { id, ...variables } };
    },

    deleteOne: async ({ id, resource }) => {
        if (resource === "users") {
            const response = await fetch(`${API_URL}/api/users/${id}`, { method: "DELETE" });
            if (!response.ok) {
                const err = await response.json().catch(() => null);
                const message = err?.error || err?.message || `HTTP error! status: ${response.status}`;
                const error = new Error(message);
                (error as any).status = response.status;
                throw error;
            }
            const result = await response.json().catch(() => ({ data: { id } }));
            return { data: result.data || { id } };
        }

        if (resource === "subjects") {
            const response = await fetch(`${API_URL}/api/subjects/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return { data: { id } };
        }

        return { data: { id } };
    },

    deleteMany: async ({ ids, resource }) => {
        if (!Array.isArray(ids)) return { data: [] };

        if (resource === "users") {
            await Promise.all(ids.map((id) => fetch(`${API_URL}/api/users/${id}`, { method: 'DELETE' })));
            return { data: ids };
        }

        if (resource === "classes") {
            await Promise.all(ids.map((id) => fetch(`${API_URL}/api/classes/${id}`, { method: 'DELETE' })));
            return { data: ids };
        }

        // fallback: return ids as deleted
        return { data: ids };
    },

    getApiUrl: () => API_URL,
};

export default dataProvider;