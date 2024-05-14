import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
    children: React.ReactNode,
    needBack2Top?: boolean
}

const PageTemplate = ({ children, needBack2Top }: Props) => {
    return (
        <div className="bg-gradient-to-t from-white flex flex-col h-full min-h-[100vh] scroll-smooth">
            <Navbar />

            <main className="flex-grow py-5 px-10">
                {children}
            </main>

            <Footer needBack2Top={needBack2Top} />
        </div >
    );
}

export default PageTemplate;