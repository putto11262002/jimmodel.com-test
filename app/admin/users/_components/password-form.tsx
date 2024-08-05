import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserPassworSchema } from "@/lib/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function PasswordForm({
  onSubmit,
  isPending,
}: {
  onSubmit: (data: { password: string }) => void;
  isPending?: boolean;
}) {
  const form = useForm<z.infer<typeof UserPassworSchema>>({
    resolver: zodResolver(UserPassworSchema),
    defaultValues: {},
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data))}>
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="py-4 border-t">
            <Button disabled={isPending}>Save</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
