"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BsSave } from "react-icons/bs";
import {
	EyeOpenIcon,
	Pencil1Icon,
	RocketIcon,
	StarIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import { BlogFormSchemaType, blogFormSchema } from "../../schema";

const BlogForm = ({
	onHandleSubmit,
}: {
	onHandleSubmit: (data: BlogFormSchemaType) => void;
}) => {
	const [isPreview, setIsPreview] = useState(false);
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof blogFormSchema>>({
		mode: "all",
		resolver: zodResolver(blogFormSchema),
		defaultValues: {
			title: "",
			content: "",
			image_url: "",
			is_premium: false,
			is_published: true,
		},
	});

	const onSubmit = (data: z.infer<typeof blogFormSchema>) => {
		startTransition(() => {
			onHandleSubmit(data);
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full border space-y-6 rounded-md pb-10"
			>
				<div className="p-5 flex items-center gap-5 flex-wrap justify-between border-b">
					<div className=" flex gap-5 items-center flex-wrap">
						<span
							role="button"
							tabIndex={0}
							className="flex items-center gap-2 border bg-zinc-100 hover:bg-zinc-100/80 p-2 rounded-md hover:ring-1 hover:ring-zinc-800 transition-all"
							onClick={() =>
								setIsPreview(
									!isPreview && !form.getFieldState("image_url").invalid
								)
							}
						>
							{isPreview ? (
								<>
									<Pencil1Icon />
									Edit
								</>
							) : (
								<>
									<EyeOpenIcon />
									Preview
								</>
							)}
						</span>

						<FormField
							control={form.control}
							name="is_premium"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex items-center gap-2 border bg-zinc-100 p-2 rounded-md">
											<StarIcon />
											<span className="">Premium</span>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="is_published"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex items-center gap-2 border bg-zinc-100 p-2 rounded-md">
											<RocketIcon />
											<span className="">Publish</span>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>

					<Button
						className={cn("flex items-center gap-2", {
							"animate-spin": isPending,
						})}
						disabled={!form.formState.isValid}
						variant="primary"
					>
						<BsSave />
						Save
					</Button>
				</div>

				{/* Title */}
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div
									className={cn(
										"p-2 w-full flex break-words gap-2",
										isPreview ? "divide-x-0" : "divide-x"
									)}
								>
									<Input
										placeholder="Blog title"
										{...field}
										className={cn(
											"text-lg font-medium leading-relaxed",
											isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
										)}
									/>

									<div
										className={cn(
											"lg:px-10 ",
											isPreview
												? "mx-auto w-full lg:w-4/5"
												: "w-1/2 hidden lg:block"
										)}
									>
										<h1 className="text-3xl font-medium ">
											{form.getValues().title}
										</h1>
									</div>
								</div>
							</FormControl>

							{form.getFieldState("title").invalid &&
								form.getValues().title && (
									<div className="p-2">
										<FormMessage />
									</div>
								)}
						</FormItem>
					)}
				/>

				{/* Image */}
				<FormField
					control={form.control}
					name="image_url"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div
									className={cn(
										"p-2 w-full flex break-words gap-2",
										isPreview ? "divide-x-0" : "divide-x"
									)}
								>
									<Input
										placeholder="Image URL"
										{...field}
										className={cn(
											"text-lg font-medium leading-relaxed",
											isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
										)}
									/>

									<div
										className={cn(
											"lg:px-10 ",
											isPreview
												? "mx-auto w-full lg:w-4/5"
												: "w-1/2 hidden lg:block"
										)}
									>
										{!isPreview ? (
											<>
												<p>Choose Preview to see image</p>
											</>
										) : (
											<div className="relative h-80 border rounded-md">
												<Image
													src={form.getValues().image_url}
													alt="image"
													className="object-cover object-center rounded-md"
													fill
												/>
											</div>
										)}
									</div>
								</div>
							</FormControl>

							{form.getFieldState("image_url").invalid &&
								form.getValues().image_url && (
									<div className="p-2">
										<FormMessage />
									</div>
								)}
						</FormItem>
					)}
				/>

				{/* Text markdown */}
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div
									className={cn(
										"p-2 w-full flex break-words gap-2 ",
										isPreview ? "divide-x-0" : "divide-x h-70vh"
									)}
								>
									<Textarea
										placeholder="Content"
										{...field}
										className={cn(
											"text-lg font-medium leading-relaxed resize-none h-full",
											isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
										)}
									/>

									<div
										className={cn(
											"overflow-y-auto",
											isPreview
												? "mx-auto w-full lg:w-4/5"
												: "w-1/2 hidden lg:block"
										)}
									>
										<MarkdownPreview
											className="text-3xl font-medium "
											content={form.getValues().content}
										/>
									</div>
								</div>
							</FormControl>

							{form.getFieldState("content").invalid &&
								form.getValues().content && (
									<div className="p-2">
										<FormMessage />
									</div>
								)}
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default BlogForm;
