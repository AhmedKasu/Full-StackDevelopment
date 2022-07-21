import React from "react";

const Header = ({ course }) => {
  return (
    <>
      <h2>{course.name}</h2>
    </>
  );
};

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part, i) => {
        return <Part key={i} name={part.name} exercises={part.exercises} />;
      })}
    </>
  );
};
const Part = ({ name, exercises }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => {
    return a + b.exercises;
  }, 0);
  return (
    <>
      <h2>total of {total} exercises</h2>
    </>
  );
};

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course, i) => {
        return (
          <React.Fragment key={i.toString()}>
            <Header course={course} />
            <Content course={course} />
            <Total parts={course.parts} />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Course;
