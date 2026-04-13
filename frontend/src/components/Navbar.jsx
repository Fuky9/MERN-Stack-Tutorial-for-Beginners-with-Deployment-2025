import { Link } from "react-router";
import {PlusIcon} from "lucide-react";

const Navbar =() => {
    return <header className="bg-base-400 border-b border-base-content/10 sticky top-0 z-50">
        <nav aria-label="Main navigation" className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link to="/" className="text-3xl font-bold text-primary font-mono tracking-tight hover:opacity-80 hover:scale-105 transition duration-200">ThinkBoard
            </Link>
            <Link to="/create" className="btn btn-primary flex items-center gap-2">
                <PlusIcon className="size-5" />
                <span>New Note</span>
            </Link>
        </nav>
    </header>
};

export default Navbar;
