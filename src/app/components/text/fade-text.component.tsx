import React, { useEffect, useState } from "react";

type Props = {
    text: string;
};

const FadeText: React.FC<Props> = ({ text }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(false);
        const timeout = setTimeout(() => {
            setShow(true);
        }, 10);

        return () => clearTimeout(timeout);
    }, [text]);

    return (
        <p
            className={`
        transition-opacity duration-500 ease-in-out
        ${show ? "opacity-100" : "opacity-0"}
        whitespace-pre-wrap
      `}
        >
            {text}
        </p>
    );
};

export default FadeText;
