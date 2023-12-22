import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React from "react";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const BlogTable = () => {
	return (
		<div className="overflow-x-auto">
			<div className="bg-gradientLight rounded-md w-[900px] md:w-full shadow-lg">
				<div className="grid grid-cols-5 p-5 text-black font-medium border-b-2 border-b-lime-500/60 ">
					<h1 className="col-span-2">Title</h1>
					<h1 className="">Premium</h1>
					<h1 className="">Publish</h1>
				</div>

				<div className="grid grid-cols-5 p-5">
					<h1 className="col-span-2">Blog title</h1>
					<Switch checked={false} />
					<Switch checked={true} />

					<Actions />
				</div>
			</div>
		</div>
	);
};

const Actions = () => (
	<div className="flex items-center gap-2 flex-wrap md:flex-row">
		<Button className="flex items-center gap-2">
			<EyeOpenIcon />
			View
		</Button>
		<Button className="flex items-center gap-2">
			<Pencil1Icon />
			Edit
		</Button>
		<Button className="flex items-center gap-2 text-rose-500">
			<TrashIcon />
			Delete
		</Button>
	</div>
);

export default BlogTable;
