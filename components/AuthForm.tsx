"use client";

import React from "react";
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    DefaultValues,
    FieldValues,
    Path,
    SubmitHandler,
    useForm,
    UseFormReturn,
} from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import FileUpload from "./FileUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AuthFormProps<T extends FieldValues> = {
    schema: ZodType<T>;
    defaultValues: T;
    type: "SIGN_IN" | "SIGN_UP";
    onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
};

const AuthForm = <T extends FieldValues>({
    type,
    schema,
    defaultValues,
    onSubmit,
}: AuthFormProps<T>) => {
    const router = useRouter();

    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,
    });

    const isSignIn = type === "SIGN_IN";

    const handleSubmit: SubmitHandler<T> = async (data) => {
        const result = await onSubmit(data);

        if (result.success) {
            toast("Success", {
                description: isSignIn
                    ? "You have successfully signed in."
                    : "You have successfully signed up.",
            });

            router.push("/");
        } else {
            toast(`Error ${isSignIn ? "signing in" : "signing up"}`, {
                description: result.error ?? "An error occurred.",
                dismissible: true,
            });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-white">
                {isSignIn
                    ? "Welcome back to BookWise"
                    : "Create your library account"}
            </h1>
            <p className="text-light-100">
                {isSignIn
                    ? "Access the vast collection of resources, and stay updated"
                    : "Please complete all fields and upload a valid university ID to gain access to the library"}
            </p>
            <Form {...form}>
                <form
                    className="w-full space-y-6"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    {Object.keys(defaultValues).map((field) => (
                        <FormField
                            key={field}
                            control={form.control}
                            name={field as Path<T>}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="capitalize">
                                        {
                                            FIELD_NAMES[
                                                field.name as keyof typeof FIELD_NAMES
                                            ]
                                        }
                                    </FormLabel>
                                    <FormControl>
                                        {field.name === "universityCard" ? (
                                            <FileUpload
                                                type="image"
                                                accept="image/*"
                                                placeholder="Upload your ID"
                                                folder="ids"
                                                variant="dark"
                                                onFileChange={field.onChange}
                                            />
                                        ) : (
                                            <Input
                                                required
                                                type={
                                                    FIELD_TYPES[
                                                        field.name as keyof typeof FIELD_TYPES
                                                    ]
                                                }
                                                {...field}
                                                className="form-input"
                                            />
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    <Button type="submit" className="form-btn">
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </Button>
                </form>
            </Form>
            <p className="text-center text-base font-medium">
                {isSignIn ? "New to BookWise? " : "Already have an account? "}

                <Link
                    href={isSignIn ? "/sign-up" : "/sign-in"}
                    className="font-bold text-primary"
                >
                    {isSignIn ? "Create an account" : "Sign in"}
                </Link>
            </p>
        </div>
    );
};

export default AuthForm;
