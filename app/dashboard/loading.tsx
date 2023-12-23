import React from "react";

const loading = () => {
	return (
		<div className="animate-pulse space-y-5">
			<div className="flex items-center justify-between">
				<div className="h-10 w-56 bg-zinc-200 rounded-md"></div>
				<div className="h-10 w-48 bg-zinc-200 rounded-md"></div>
			</div>

            <div className="border h-96 rounded-md bg-zinc-200"></div>
		</div>
	);
};

export default loading;
