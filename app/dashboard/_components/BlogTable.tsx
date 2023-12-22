import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React from "react";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { readBlog } from "@/lib/actions/blog";

const BlogTable = async () => {
	const { data: blogs } = await readBlog();

	return (
		<div className="overflow-x-auto">
			<div className="bg-neutral-100 rounded-md w-[900px] md:w-full shadow-lg">
				<div className="grid grid-cols-5 p-5 text-black font-semibold border-b-2 border-b-lime-500/60 ">
					<h1 className="col-span-2">Title</h1>
					<h1 className="">Premium</h1>
					<h1 className="">Publish</h1>
				</div>

				{/* blog-list */}
				{blogs?.map((blog, index) => (
					<div className="grid grid-cols-5 p-5" key={index}>
						<h1 className="col-span-2 font-medium">{blog.title}</h1>
						<Switch checked={blog.is_premium} />
						<Switch checked={blog.is_published} />

						<Actions />
					</div>
				))}
			</div>
		</div>
	);
};

const Actions = () => (
	<div className="flex items-center gap-2 flex-wrap md:flex-row">
		<Button className="flex items-center gap-2" variant="outline">
			<EyeOpenIcon />
			View
		</Button>
		<Button className="flex items-center gap-2" variant="outline">
			<Pencil1Icon />
			Edit
		</Button>
		<Button className="flex items-center gap-2 text-rose-500" variant='outline'>
			<TrashIcon />
			Delete
		</Button>
	</div>
);

export default BlogTable;
