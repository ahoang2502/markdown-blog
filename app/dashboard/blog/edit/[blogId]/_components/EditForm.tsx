"use client";

import React from "react";
import { useRouter } from "next/navigation";

import BlogForm from "../../../_components/BlogForm";
import { IBlogDetails } from "@/lib/types";
import { BlogFormSchemaType } from "@/app/dashboard/schema";
import { toast } from "@/components/ui/use-toast";
import { updateBlogDetails } from "@/lib/actions/blog";

const EditForm = ({ blog }: { blog: IBlogDetails }) => {
	const router = useRouter();

	const handleEdit = async (data: BlogFormSchemaType) => {
		const result = await updateBlogDetails(blog?.id!, data);
		const { error } = JSON.parse(result);

		if (error?.message)
			toast({
				title: "Failed to update blog!",
				description: (
					<pre className="mt-2 w-full rounded-md bg-neutral-100 p-4">
						<code className="text-rose-500">{error.message}</code>
					</pre>
				),
			});
		else {
			toast({
				title: "Successfully updated!",
			});

			router.push("/dashboard");
		}
	};

	return <BlogForm onHandleSubmit={handleEdit} blog={blog} />;
};

export default EditForm;
