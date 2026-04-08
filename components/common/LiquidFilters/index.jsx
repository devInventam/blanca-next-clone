import React from 'react';

const LiquidFilters = () => {
    return (
        <svg style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
            <defs>
                <filter id="lg-dist">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.01 0.01"
                        numOctaves="1"
                        result="warp"
                        seed="1"
                    >
                        <animate
                            attributeName="baseFrequency"
                            from="0.01 0.01"
                            to="0.02 0.02"
                            dur="10s"
                            repeatCount="indefinite"
                        />
                    </feTurbulence>
                    <feDisplacementMap
                        xChannelSelector="R"
                        yChannelSelector="G"
                        scale="30"
                        in="SourceGraphic"
                        in2="warp"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export default LiquidFilters;
