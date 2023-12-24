import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";

import DeleteAlert from "@/app/dashboard/blog/_components/DeleteAlert";
import { Button } from "@/components/ui/button";
import { readBlogAdmin, updateBlogById } from "@/lib/actions/blog";
import { BlogFormSchemaType } from "../../schema";
import SwitchForm from "./SwitchForm";
import Link from "next/link";

const BlogTable = async () => {
	const { data: blogs } = await readBlogAdmin();

	return (
		<div className="overflow-x-auto">
			<div className="bg-neutral-100 rounded-md sm:w-[900px] md:w-full shadow-lg">
				<div className="grid grid-cols-5 p-5 text-black font-semibold border-b-2 border-b-lime-500/60 ">
					<h1 className="col-span-2">Title</h1>
					<h1 className="">Premium</h1>
					<h1 className="">Publish</h1>
				</div>

				{/* blog-list */}
				{blogs?.map((blog, index) => {
					const updatePremium = updateBlogById.bind(null, blog.id, {
						is_premium: !blog.is_premium,
					} as BlogFormSchemaType);

					const updatePublish = updateBlogById.bind(null, blog.id, {
						is_published: !blog.is_published,
					} as BlogFormSchemaType);

					return (
						<div className="grid grid-cols-5 p-5" key={index}>
							<h1 className="col-span-2 font-medium">{blog.title}</h1>
							<SwitchForm
								checked={blog.is_premium}
								name="Premium"
								onToggle={updatePremium}
							/>
							<SwitchForm
								checked={blog.is_published}
								name="Publish"
								onToggle={updatePublish}
							/>

							<Actions id={blog.id} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

const Actions = ({ id }: { id: string }) => (
	<div className="flex items-center gap-2 flex-wrap md:flex-row">
		<Link href={`/blog/${id}`}>
			<Button className="flex items-center gap-2" variant="outline">
				<EyeOpenIcon />
				View
			</Button>
		</Link>
		<Link href={`/dashboard/blog/edit/${id}`}>
			<Button className="flex items-center gap-2" variant="outline">
				<Pencil1Icon />
				Edit
			</Button>
		</Link>
		<DeleteAlert blogId={id} />
	</div>
);

export default BlogTable;
