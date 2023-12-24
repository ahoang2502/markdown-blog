import { IBlog } from "@/lib/types";
import Image from "next/image";
import React from "react";

const BlogIdPage = async ({ params }: { params: { blogId: string } }) => {
	const { data: blog } = (await fetch(
		process.env.SITE_URL + "/api/blog?id=" + params.blogId
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
			{JSON.stringify(blog)}
		</div>
	);
};

export default BlogIdPage;
