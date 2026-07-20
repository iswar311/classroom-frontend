import { ListView } from "@/components/refine-ui/views/list-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useTable } from "@refinedev/react-table";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { ROLE_OPTIONS } from "@/constants/index";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { useGetIdentity } from "@refinedev/core";
import dataProvider from "@/providers/data";

const UsersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const { data: identity } = useGetIdentity<{ id: string; role?: string }>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const columns = [
    {
      id: "select",
      header: () => <div className="text-sm">Select</div>,
      cell: ({ row }: any) => {
        const id = String(row.original.id);
        const checked = selectedIds.includes(id);
        return (
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              if (e.target.checked) setSelectedIds((s) => [...s, id]);
              else setSelectedIds((s) => s.filter((x) => x !== id));
            }}
          />
        );
      },
      size: 60,
    },
    { id: "name", accessorKey: "name", header: "Name" },
    { id: "email", accessorKey: "email", header: "Email" },
    {
      id: "role",
      accessorKey: "role",
      header: "Role",
      cell: ({ getValue }: any) => <Badge>{getValue<string>()}</Badge>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <div className="flex flex-wrap items-center gap-2">
          <ShowButton resource="users" recordItemId={row.original.id} size="sm" variant="outline">
            View
          </ShowButton>
          <EditButton resource="users" recordItemId={row.original.id} size="sm">
            Edit
          </EditButton>
          <DeleteButton resource="users" recordItemId={row.original.id} size="sm">
            Delete
          </DeleteButton>
        </div>
      ),
      size: 220,
    },
  ] as ColumnDef<User>[];

  const roleFilter = selectedRole === "all" ? [] : [{ field: "role", operator: "eq" as const, value: selectedRole }];
  const searchFilter = searchQuery
    ? [{ field: "search", operator: "contains" as const, value: searchQuery }]
    : [];

  const table = useTable<User>({
    columns,
    refineCoreProps: {
      resource: "users",
      pagination: { pageSize: 10, mode: "server" },
      filters: {
        permanent: [...roleFilter, ...searchFilter],
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage students, teachers, and admins in the system.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none p-0 shadow-none"
            />
          </div>

          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {ROLE_OPTIONS.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <CreateButton resource="users" />

          {selectedIds.length > 0 && identity?.role === "admin" && (
            <button
              className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              onClick={async () => {
                try {
                  await dataProvider.deleteMany({ ids: selectedIds, resource: "users" } as any);
                  setSelectedIds([]);
                  table.refineCore.tableQuery?.refetch?.();
                } catch (err) {
                  console.error(err);
                  alert("Bulk delete failed");
                }
              }}
            >
              Delete {selectedIds.length}
            </button>
          )}
        </div>
      </div>

      <DataTable table={table} />
    </ListView>
  );
};

export default UsersList;
