import { useEffect } from "react";
import { useRef } from "react";

type useOutSideClickType = {
  callback: (value: string) => void;
}

export const useOutsideClick = ({callback}: useOutSideClickType) => {
    const ref: React.MutableRefObject<HTMLElement | undefined> = useRef();
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (!ref?.current?.contains(event.target)) {
              callback('')
            }
        }

        const onKeypress = (e:KeyboardEvent) => e.keyCode === 27 ? callback('') : ''

        document.addEventListener('keypress', onKeypress)
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keypress', onKeypress)
        }
    }, [callback, ref])
    return ref
}