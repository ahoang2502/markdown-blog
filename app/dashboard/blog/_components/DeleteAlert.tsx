"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import React, { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Button } from "../../../../components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteBlogById } from "@/lib/actions/blog";
import { toast } from "../../../../components/ui/use-toast";
import { cn } from "@/lib/utils";

const DeleteAlert = ({ blogId }: { blogId: string }) => {
	const [isPending, startTransition] = useTransition();

	const onSubmit = async (e: any) => {
		e.preventDefault();

		startTransition(async () => {
			const result = await deleteBlogById(blogId);

			const { error } = JSON.parse(result);
			if (error?.message)
				toast({
					title: "Failed to delete blog!",
					description: (
						<pre className="mt-2 w-full rounded-md bg-neutral-100 p-4">
							<code className="text-rose-500">{error.message}</code>
						</pre>
					),
				});
			else {
				toast({
					title: "Successfully deleted!",
				});
			}
		});
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					className="flex items-center gap-2 text-rose-500"
					variant="outline"
				>
					<TrashIcon />
					Delete
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete this blog?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your blog
						and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>

				{/* Actions */}
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<form onSubmit={onSubmit}>
						<Button variant="destructive" className="flex items-center gap-2">
							<AiOutlineLoading3Quarters
								className={cn("animate-spin", { hidden: !isPending })}
							/>
							Continue
						</Button>
					</form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteAlert;
