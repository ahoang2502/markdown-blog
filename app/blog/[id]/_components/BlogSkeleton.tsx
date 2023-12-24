import React from "react";

const BlogSkeleton = () => {
	return (
		<div className="animate-pulse space-y-5 p-10">
			<div className="h-8 bg-neutral-200 w-full rounded-md"></div>
			<div className="h-8 bg-neutral-200 w-[80%] rounded-md"></div>
			<div className="h-16 bg-neutral-200 w-56 rounded-md"></div>
			<div className="h-8 bg-neutral-200 w-96 rounded-md"></div>
			<div className="h-8 bg-neutral-200 w-full rounded-md"></div>
		</div>
	);
};

export default BlogSkeleton;
