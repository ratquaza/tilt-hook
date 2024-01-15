# tilt-hook
A simple React hook that creates a tilting card effect.
```jsx
export default function CardWrapper() {
    const wrapperElement = useRef()
    const cardElement = useRef()
    const setDistance = useTilt(wrapperElement, cardElement, { degree: 30 })

    return (
    <div ref={wrapperElement}>
        <div ref={cardElement}>
            <img style={setDistance(30)}/>
        </div>
    </div>)
}
```
# useTilt
The default export, the `useTilt` function, takes 2-3 parameters:
`useTilt(wrapper: RefObject, target: RefObjeect, options?: TiltOptions)`. 

Returns `setDistance` function, which can be used to easily set the distance, or z-depth, of an element.

# TiltOptions
`degree: number` - The maximum degree that a card can turn.

`perspective: number` - The perspective used for the 3D effect.

`inverted: boolean` - Whether the card should tilt to be closer to the mouse instead, on hover.