import React from "react";

const getRandomDelay = () => Math.random() * 5;

const SciFiLeds = () => {
    return (
        <div className="flex items-center">
            {/* LED azul grande */}
            <div
                className="relative w-14 h-14 bg-blue-500 rounded-full mr-4 ring-2
          border border-gray-200/50 dark:border-gray-600/50 glow-blue animate-pulse-blue"
            >
                {/* Reflejo blanco */}
                <div className="absolute top-1 left-1 w-4 h-4 bg-white/60 rounded-full blur-sm"></div>
                {/* Reflejo interno más chico */}
                <div className="absolute top-2 left-2 w-2 h-2 bg-blue-300/30 rounded-full blur-sm"></div>
            </div>

            {/* LEDs chicos con fondo negro detrás */}
            <div className="flex flex-row gap-2">
                {["bg-red-500", "bg-yellow-400", "bg-green-500"].map((color, index) => {
                    const delay = getRandomDelay();
                    return (
                        <div
                            key={index}
                            className="w-4 h-4 rounded-full bg-slate-500 dark:bg-slate-800 flex items-center justify-center"
                        >
                            <div
                                className={`${color} w-3 h-3 rounded-full animate-led-onoff`}
                                style={{
                                    animationDelay: `${delay}s`,
                                    boxShadow: "0 0 6px rgba(255,255,255,0.3)", // leve glow
                                }}
                            ></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SciFiLeds;
