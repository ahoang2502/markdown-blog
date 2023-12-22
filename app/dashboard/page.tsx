import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import BlogTable from "./blog/_components/BlogTable";

const DashboardPage = () => {
	return (
		<div className="space-y-5">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold ">Blogs</h1>

				<Link href="/dashboard/blog/create">
					<Button variant="primary">
						Create <PlusIcon className="ml-1" />
					</Button>
				</Link>
			</div>

			<BlogTable />
		</div>
	);
};

export default DashboardPage;
