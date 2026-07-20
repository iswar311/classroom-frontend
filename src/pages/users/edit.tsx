import { EditView } from "@/components/refine-ui/views/edit-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { facultySchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { useForm as useRefineForm } from "@refinedev/react-hook-form";

const UsersEdit = () => {
  const form = useRefineForm({ resolver: zodResolver(facultySchema), refineCoreProps: { resource: "users", action: "edit" } });
  const { refineCore: { onFinish }, handleSubmit, control, formState: { isSubmitting } } = form;

  const onSubmit = async (values: z.infer<typeof facultySchema>) => {
    await onFinish(values);
  };

  return (
    <EditView>
      <Breadcrumb />
      <h1 className="page-title">Edit User</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormField control={control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={control} name="role" render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" size="lg" className="w-full">{isSubmitting ? 'Saving...' : 'Save'}</Button>
        </form>
      </Form>
    </EditView>
  );
};

export default UsersEdit;
