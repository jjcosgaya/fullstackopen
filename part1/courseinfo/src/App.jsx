const Header = (props) => {
      return <h1>{props.course}</h1>
}

const Content = ({parts, exercises}) => {
  return (
    <>
      <Part part={parts[0]} exercises={exercises[0]}/>
      <Part part={parts[1]} exercises={exercises[1]}/>
      <Part part={parts[2]} exercises={exercises[2]}/>
    </>
  )
}

const Total = ({exercises}) => {
  const sum = Object.values(exercises).reduce((acc, current) => acc + current, 0);
  return <p>Number of exercises {sum}</p>
}

const Part = props => {
  return (
      <p>
        {props.part} {props.exercises}
      </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  const parts = [part1, part2, part3]
  const exercises = [exercises1, exercises2, exercises3]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} exercises={exercises}/>
      <Total exercises={exercises}/>
    </div>
  )
}

export default App
