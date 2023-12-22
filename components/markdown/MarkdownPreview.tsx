import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/base16/papercolor-light.css";
import { PiTerminal } from "react-icons/pi";

import { cn } from "@/lib/utils";
import CopyButton from "./CopyButton";
import { icons } from "@/lib/icons";

const MarkdownPreview = ({
	content,
	className,
}: {
	content: string;
	className?: string;
}) => {
	return (
		<Markdown
			rehypePlugins={[rehypeHighlight]}
			className={cn("space-y-6 ", className)}
			components={{
				h1: ({ node, ...props }) => (
					<h1 {...props} className="text-3xl font-bold" />
				),
				h2: ({ node, ...props }) => (
					<h1 {...props} className="text-2xl font-bold" />
				),
				h3: ({ node, ...props }) => (
					<h1 {...props} className="text-xl font-bold" />
				),
				p: ({ node, ...props }) => <p {...props} className="text-base" />,
				code: ({ node, className, children, ...props }) => {
					const match = /language-(\w+)/.exec(className || "");

					if (match?.length) {
						let Icon = PiTerminal;

						const isMatched = icons.hasOwnProperty(match[1]);
						if (isMatched) {
							Icon = icons[match[1] as keyof typeof icons];
						}

						const id = Math.floor(Math.random() * 100 + 1).toString();

						return (
							<div className="text-base border rounded-md bg-neutral-100">
								<div className="px-5 py-2 border-b flex justify-between items-center">
									<div className="flex items-center gap-2">
										<Icon />

										<span>
											{
												//@ts-ignore
												node?.data?.meta
											}
										</span>
									</div>
									<CopyButton id={id} />
								</div>
								<div className="overflow-x-auto w-full">
									<div className="p-5" id={id}>
										{children}
									</div>
								</div>
							</div>
						);
					} else {
						return (
							<code className="bg-neutral-100 rounded-md px-2 py-1 text-base">
								{children}
							</code>
						);
					}
				},
			}}
		>
			{content}
		</Markdown>
	);
};

export default MarkdownPreview;
