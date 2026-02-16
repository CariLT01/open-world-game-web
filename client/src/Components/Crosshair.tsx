
import crosshairImage from "../../assets/crosshair.png"

export function Crosshair() {
    return <div className="fixed w-[15px] h-[15px] top-[50%] left-[50%] transform -translate-x-[50%] -translate-z-[50%] bg-no-repeat bg-cover pixel-art" style={{
        backgroundImage: `url(${crosshairImage})`
    }}></div>
}