const Header = (props) => {
    return (
        <div>
            <h2>{props.course}</h2>
        </div>
    )
}
const Content = (props) => {
    return (
        <div>
            {props.parts.map(part =>
                    <Part key={part.id} part={part.name} exercises={part.exercises} />
                )}
        </div>
    )

}
const Total = (props) => {
    return (
        <div>
            <p>Number of exercises {props.parts.map(exercises => exercises.exercises).reduce(
                (accumulator, currentValue) => accumulator + currentValue
            )}</p>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.part} {props.exercises}
            </p>
        </div>
    )
}

const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name}></Header>
            <Content parts={props.course.parts}></Content>
            <Total parts={props.course.parts}></Total>
        </div>
    )
}

export default Course

