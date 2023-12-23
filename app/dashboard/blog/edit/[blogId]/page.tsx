import { readBlogById } from "@/lib/actions/blog";
import React from "react";
import EditForm from "./_components/EditForm";

const BlogIdPage = async ({ params }: { params: { blogId: string } }) => {
	const { data:blog } = await readBlogById(params.blogId);

	return <EditForm blog={blog} />
};

export default BlogIdPage;
