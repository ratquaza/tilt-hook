import { useEffect, RefObject } from "react";

export default function useTilt(wrapper: RefObject<any>, target: RefObject<any>, options?: { degree?: number, perspective?: number, inverted?: boolean }) {
    const degree = options && options.degree || 30;
    const perspective = options && options.perspective || 1000;
    const inverted = options && options.inverted || false;

    useEffect(() => {
        if (wrapper.current && target.current) {
            function handleMouseMove(e: MouseEvent) {
                const boundingBox = target.current.getBoundingClientRect();

                let xRatio = (e.clientX - boundingBox.left)/boundingBox.width;
                let yRatio = (e.clientY - boundingBox.top)/boundingBox.height;

                if (inverted) {
                    xRatio = 1 - xRatio;
                    yRatio = 1 - yRatio;
                }
        
                target.current.style.transform = `perspective(${perspective}px) rotateX(${-(degree * yRatio - degree/2)}deg) rotateY(${degree * xRatio - degree/2}deg)`
                target.current.style.transformStyle = 'preserve-3d'
            }
            function handleMouseLeave() {
                target.current.style.transform = ''
                target.current.style.transformStyle = ''
            }
    
            wrapper.current.addEventListener("mousemove", handleMouseMove)
            wrapper.current.addEventListener("mouseleave", handleMouseLeave)

            return () => {
                wrapper.current.removeEventListener("mousemove", handleMouseMove)
                wrapper.current.removeEventListener("mouseleave", handleMouseLeave)
                handleMouseLeave()
            }
        }
    }, [wrapper, target, options])

    return (translate?: number) => { return { transform: `translate3d(0px, 0px, ${(translate || 30)}px)` } }
}