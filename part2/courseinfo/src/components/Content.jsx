import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {

    const total = parts.reduce((acc, current) => acc + current.exercises, 0)

    return (
        <>
            {parts.map((part) => (
                <Part key={part.id} text={part.name} number={part.exercises}/>
            ))}
            <Total total={total} />
        </>
    )
} 


export default Content;