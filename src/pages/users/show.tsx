import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { useShow } from "@refinedev/core";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";

const UsersShow = () => {
  const { query } = useShow<User>({ resource: "users" });
  const user = query.data?.data;

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <ShowView className="space-y-6">
      <ShowViewHeader title={user.name} />

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <section className="rounded-2xl border bg-background p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4 text-center">
            <Avatar className="h-28 w-28">
              {user.image ? (
                <AvatarImage src={user.image} alt={user.name} />
              ) : (
                <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Badge className="uppercase">{user.role}</Badge>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Department</h3>
              <p className="mt-2 text-sm">{user.department || "Not assigned"}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Joined</h3>
              <p className="mt-2 text-sm">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Last updated</h3>
              <p className="mt-2 text-sm">{new Date(user.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border bg-background p-6 shadow-sm">
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold">Profile details</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                View essential user information for management and auditing.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border p-4">
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="mt-2 break-all text-sm font-medium">{user.id}</p>
              </div>
              <div className="rounded-xl border p-4">
                <p className="text-sm text-muted-foreground">Email verified</p>
                <p className="mt-2 text-sm font-medium">{user.email ? "Yes" : "No"}</p>
              </div>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-sm text-muted-foreground">Notes</p>
              <p className="mt-2 text-sm">
                This user has the <strong>{user.role}</strong> role and can access features according to their assigned permissions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </ShowView>
  );
};

export default UsersShow;
