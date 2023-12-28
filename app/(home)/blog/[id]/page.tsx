import Image from "next/image";
import React from "react";

import { IBlog } from "@/lib/types";
import BlogContent from "./_components/BlogContent";

export async function generateStaticParams() {
	const { data: blog } = await fetch(
		process.env.SITE_URL + "/api/blog?id=" + "*"
	).then((res) => res.json());

	return blog;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
	const { data: blog } = (await fetch(
		process.env.SITE_URL + "/api/blog?id=" + params.id
	).then((res) => res.json())) as { data: IBlog };

	return {
		title: blog?.title,
		authors: {
			name: "DailyBlog",
		},
		openGraph: {
			title: blog?.title,
			url: process.env.SITE_URL + "/blog/" + params.id,
			siteName: "DailyBlog",
			images: blog?.image_url,
			type: "website",
		},
		keyword: ["DailyBlog", "React", "Nextjs"],
	};
}

const BlogIdPage = async ({ params }: { params: { id: string } }) => {
	const { data: blog } = (await fetch(
		process.env.SITE_URL + "/api/blog?id=" + params.id
	).then((res) => res.json())) as { data: IBlog };

	if (!blog?.id) {
		return <h1 className="font-semibold text-3xl">Not found.</h1>;
	}

	return (
		<div className="max-w-5xl mx-auto min-h-screen pt-10 space-y-10">
			<div className="sm:px-10 space-y-5">
				<h1 className="text-3xl font-bold">{blog?.title}</h1>
				<p className="text-sm text-gray-400">
					{new Date(blog?.created_at || "").toDateString()}
				</p>
			</div>

			<div className="w-full h-96 relative">
				<Image
					src={blog?.image_url || "/"}
					alt="cover-image"
					fill
					className="object-cover object-center rounded-md border"
					sizes="(max-width:768px) 100vw, (max-width:1200px): 50vw, 33vw"
					priority
				/>
			</div>

			<BlogContent blogId={blog.id} />
		</div>
	);
};

export default BlogIdPage;
