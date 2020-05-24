import React, { useReducer, useMemo } from "react";
import courseMocks from "../data/courses.json";
import { useRouteMatch } from "react-router-dom";

type AddCourseAction = { type: "add_course"; course: any };
type RemoveCourseAction = { type: "remove_course"; courseId: string };
type SetCoursesAction = { type: "set_courses"; courses: any[] };
type UpdateCourseAction = {
  type: "update_course";
  courseId: string;
  update: any;
};

type Action =
  | AddCourseAction
  | RemoveCourseAction
  | SetCoursesAction
  | UpdateCourseAction;

type Dispatch = (action: Action) => void;

type CoursesState = {
  activeCourse: any;
  courses: any[];
};

const CoursesContext = React.createContext<CoursesState | undefined>(undefined);
const CoursesDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function coursesReducer(courses: any[], action: Action): any {
  switch (action.type) {
    case "add_course": {
      return [...courses, action.course];
    }
    case "remove_course": {
      return courses.filter((course: any) => course._id !== action.courseId);
    }
    case "set_courses": {
      return action.courses;
    }
    case "update_course": {
      return courses.map((home: any) => {
        if (home._id === action.courseId) {
          return {
            ...home,
            ...action.update,
          };
        }

        return home;
      });
    }
  }
}

const CoursesProvider: React.FunctionComponent = ({ children }) => {
  const match = useRouteMatch<any>("/courses/:courseId");
  const [courses, dispatch] = useReducer(coursesReducer, courseMocks);

  const activeCourse = useMemo(
    () =>
      courses.find(
        (course: any) => course.id === Number(match?.params?.courseId)
      ),
    [courses, match]
  );

  return (
    <CoursesContext.Provider
      value={{
        activeCourse,
        courses,
      }}
    >
      <CoursesDispatchContext.Provider value={dispatch}>
        {children}
      </CoursesDispatchContext.Provider>
    </CoursesContext.Provider>
  );
};

function useCoursesState() {
  const context = React.useContext(CoursesContext);

  if (context === undefined) {
    throw new Error("useCoursesState must be used within a CoursesContext");
  }

  return context;
}

function useCoursesDispatch() {
  const context = React.useContext(CoursesDispatchContext);

  if (context === undefined) {
    throw new Error("useCoursesDispatch must be used within a CoursesContext");
  }

  return context;
}

export { CoursesProvider, useCoursesDispatch, useCoursesState };
