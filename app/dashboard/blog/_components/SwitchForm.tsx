"use client";

import React from "react";

import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

const SwitchForm = ({
	checked,
	onToggle,
	name,
}: {
	checked: boolean;
	onToggle: () => Promise<string>;
	name: string;
}) => {
	const onSubmit = async (e: any) => {
		e.preventDefault();

		const { error } = JSON.parse(await onToggle());
		if (error?.message)
			toast({
				title: "Failed to update " + name,
				description: (
					<pre className="mt-2 w-full rounded-md bg-neutral-100 p-4">
						<code className="text-rose-500">{error.message}</code>
					</pre>
				),
			});
		else {
			toast({
				title: `Successfully update ${name}!`,
			});
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<Switch checked={checked} type="submit" />
		</form>
	);
};

export default SwitchForm;
