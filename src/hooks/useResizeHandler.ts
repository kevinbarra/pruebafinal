import { useEffect } from "react"

type Params = ({
    use: 'logo'
    setLogo: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>
    logo: JSX.Element
} | {
    use: 'animation'
    setStyle: React.Dispatch<React.SetStateAction<object>>
    imageRef: React.RefObject<HTMLImageElement>
})

export const useResizeHandler = (params: Params) => {

    const handleResizeIcon = () => {
        if (params.use === 'logo') {
            if (window.innerWidth < 640) {
                params.setLogo(params.logo)
            }
            else {
                params.setLogo(undefined)
            }
        }
    }

    const handleResizeAnimation = () => {
        if (params.use === 'animation') {
            if (params.imageRef.current) {
                const image = params.imageRef.current
                let heightFactor = 2.8
                let widthFactor = 1.8

                if (window.innerWidth > 1007 && window.innerWidth < 1280) {
                    heightFactor = 3
                    widthFactor = 2.5
                }

                params.setStyle({
                    'top': image.height / heightFactor,
                    'left': image.width / widthFactor,
                    'offsetPath': `path('M 0 0 A 10 16 0 0 1 ${image.width / 3.95} ${image.height / 2.1}')`
                })
            }
        }
    }

    useEffect(() => {
        if (params.use === 'animation') {
            if (params.imageRef.current) {
                handleResizeAnimation()
            }

            if (typeof window.onresize === 'function') {
                window.removeEventListener('resize', handleResizeIcon);
            }

            window.addEventListener('resize', handleResizeAnimation);
        }
        else if (params.use === 'logo') {
            handleResizeIcon()

            if (typeof window.onresize === 'function') {
                window.removeEventListener('resize', handleResizeAnimation);
            }

            window.addEventListener('resize', handleResizeIcon);
        }


        return () => {
            if (params.use === 'animation') {
                window.removeEventListener('resize', handleResizeAnimation);
            }
            else if (params.use === 'logo') {
                window.removeEventListener('resize', handleResizeIcon);
            }
        }
    }, [])
}