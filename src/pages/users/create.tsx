import { CreateView } from "@/components/refine-ui/views/create-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { facultySchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { ROLE_OPTIONS } from "@/constants/index";
import * as z from "zod";

const UsersCreate = () => {
  const notify = useNotify();
  const form = useForm({
    resolver: zodResolver(facultySchema),
    refineCoreProps: {
      resource: "users",
      action: "create",
      redirect: "list",
    },
  });
  const { refineCore: { onFinish }, handleSubmit, control, formState: { isSubmitting } } = form;

  const onSubmit = async (values: z.infer<typeof facultySchema>) => {
    try {
      return await onFinish(values);
    } catch (error) {
      console.error("Unable to create user:", error);
      throw error;
    }
  };

  return (
    <CreateView>
      <Breadcrumb />
      <h1 className="page-title">Create User</h1>
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={control} name="department" render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" size="lg" className="w-full">{isSubmitting ? 'Creating...' : 'Create User'}</Button>
        </form>
      </Form>
    </CreateView>
  );
};

export default UsersCreate;
