import Image from "next/image";

import Terminal from "@countdown/components/Terminal";

export default function Home() {
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <Terminal />
        </div>
    );
}
