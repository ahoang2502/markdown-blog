"use client";

import { BackpackIcon } from "@radix-ui/react-icons";
import { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { manageBilling } from "@/lib/actions/stripe";
import { Button } from "../ui/button";
import { useUser } from "@/lib/store/user";
import { cn } from "@/lib/utils";

const ManageBilling = () => {
	const user = useUser((state) => state.user);
	const [isPending, startTransition] = useTransition();

	const onSubmit = (e: any) => {
		e.preventDefault();

		startTransition(async () => {
			const data = JSON.parse(await manageBilling(user?.stripe_customer_id!));

			window.location.href = data.url;
		});
	};

	return (
		<form onSubmit={onSubmit}>
			<Button
				className="flex items-center justify-between w-full"
				variant="ghost"
			>
				<span className="flex items-center gap-2">
					<AiOutlineLoading3Quarters
						className={cn("animate-spin", { hidden: !isPending .})}
					/>
					Billing
				</span>
				<BackpackIcon />
			</Button>
		</form>
	);
};

export default ManageBilling;
