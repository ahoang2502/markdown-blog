"use client";

import { useRouter } from "next/navigation";
import React from "react";

import BlogForm from "../../_components/BlogForm";
import { BlogFormSchemaType } from "../../schema";
import { toast } from "@/components/ui/use-toast";
import { createBlog } from "@/lib/actions/blog";

const BlogCreatePage = () => {
	const router = useRouter();

	const handleCreate = async (data: BlogFormSchemaType) => {
		const result = await createBlog(data);
		const { error } = JSON.parse(result);

		if (error?.message)
			toast({
				title: "Failed to create blog!",
				description: (
					<pre className="mt-2 w-full rounded-md bg-neutral-100 p-4">
						<code className="text-rose-500">{error.message}</code>
					</pre>
				),
			});
		else {
			toast({
				title: `Blog ${data.title.toLowerCase()} successfully created!`,
			});

			router.push("/dashboard");
		}
	};

	return <BlogForm onHandleSubmit={handleCreate} />;
};

export default BlogCreatePage;
