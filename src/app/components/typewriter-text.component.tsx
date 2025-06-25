import React, { useEffect, useState } from "react";

type Props = {
    text: string;
    speed: number;
};

const TypewriterText: React.FC<Props> = ({ text, speed = 25 }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = -1;
        setDisplayedText("");

        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + text[index]);
            index++;
            if (index >= text.length - 1) clearInterval(interval);
        }, speed);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <p className="whitespace-pre-wrap transition-all duration-300 ease-in-out">
            {displayedText}
        </p>
    );
};

export default TypewriterText;
