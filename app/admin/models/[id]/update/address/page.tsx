"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { UpdateModelSchema } from "@/lib/validators/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSession from "@/hooks/use-session";
import { useGetModel, useUpdateModel } from "@/hooks/queries/model";
import permissions from "@/config/permission";

const FormDataSchema = UpdateModelSchema;

export default function Page({ params: { id } }: { params: { id: string } }) {
  const session = useSession(permissions.models.getModelById);
  const { data } = useGetModel({
    modelId: id,
    enabled: session.status === "authenticated",
  });
  const { mutate } = useUpdateModel();

  const form = useForm<z.infer<typeof FormDataSchema>>({
    resolver: zodResolver(UpdateModelSchema),
    defaultValues: data,
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((formData) =>
            mutate({ modelId: id, input: formData }),
          )}
          className=""
        >
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription>Model address information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="address"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="city"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="region"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="country"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="zipCode"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit">Save</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
}
