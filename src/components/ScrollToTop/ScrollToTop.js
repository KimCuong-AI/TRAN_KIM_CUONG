import React, { useEffect, useState } from "react";
import './scroll.css'
import toppng from '../../assets/img/toppng.png'

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        if (window.pageYOffset > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });  
    };
    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="scroll-to-top">
            {isVisible && (
                <div onClick={scrollToTop} style={{transform:'rotate(-90deg)'}}>
                    <img width={40}
                        src={toppng}
                        alt="Go to top"
                    />
                </div>
            )}
        </div>
    );
}
