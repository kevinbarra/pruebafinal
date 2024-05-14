import { ChevronUpIcon } from "@heroicons/react/24/outline";

interface Props {
    needBack2Top?: boolean
}

const Footer = ({ needBack2Top }: Props) => {
    return (
        <>
            {needBack2Top &&
                <a href='#top' className="inline-flex items-center gap-4 justify-center w-full hover:bg-white/5 hover:text-violet-800 text-lg focus:outline-none focus:bg-white/5 focus:text-violet-800 p-2 mb-2 scroll-smooth">
                    <ChevronUpIcon className="w-7" />
                    Go back to top
                    <ChevronUpIcon className="w-7" />
                </a>
            }
            <footer className="mx-5 md:px-5 pb-5 flex">
                <section className="flex justify-center flex-grow">
                    &copy; {new Date().getFullYear()} E-Commerce
                </section>
                <section className="flex justify-end gap-3 absolute right-5">
                    <a href="https://www.youtube.com/watch?v=mCdA4bJAGGk" target="_blank" className="inline-flex items-center gap-4">
                        <i className="pi pi-facebook text-2xl"></i>
                    </a>
                    <a href="https://github.com/sistemas-distribuidos-ibero" target="_blank" className="inline-flex items-center gap-4">
                        <i className="pi pi-github text-2xl"></i>
                    </a>
                </section>
            </footer>
        </>
    )
}

export default Footer;