import { gsap } from "gsap"

const useAnimacion = (refanimacion) => {

    const animar = () => {
        gsap.fromTo(refanimacion.current, { opacity: 0 }, { opacity: 1, duration: 0.0 }) //duration 0.9
    }

    return { animar }
}

export default useAnimacion