import Footer from "@/components/Footer";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{children}
			<Footer />
		</>
	);
};

export default HomeLayout;
