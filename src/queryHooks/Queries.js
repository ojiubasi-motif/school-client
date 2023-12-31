/* eslint-disable no-unused-vars */
import axios from "axios";
// axios.defaults.withCredentials = true;
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import jwt from "jwt-decode";
import Cookies from "js-cookie";

// const localBaseUrl = "https://school-manager-i86s.onrender.com/api/v1/";
const localBaseUrl = "http://localhost:8080/api/v1/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY2hvb2xfaWQiOiIyNDgyIiwiZmlyc3RfbmFtZSI6IkxpIiwibGFzdF9uYW1lIjoiQ2hpIiwiZW1haWwiOiJsaUBnbWFpbC5jb20iLCJ0cmFpbmVyX2lkIjoiNTEzNTciLCJpYXQiOjE2OTY3MTU3NjYsImV4cCI6MTY5OTMwNzc2Nn0.NhBC-zehZfZTgeQ9H5Yl2yvLWuCNhRlCSVOIAzuhk6E";

const createSchool = (school) => {
  return axios.post(`${localBaseUrl}schools`, school);
};

const createClass = (classData) => {
  // console.log("school id==>", classData?.school_id)
  return axios.post(
    `${localBaseUrl}grades/${classData?.school_id}/create`,
    classData,
    {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        token,
      },
    }
  );
};

const createStudent = (studentData) => {
  // console.log("payload submitted==>", studentData);
  return axios.post(`${localBaseUrl}students`, studentData, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      token,
    },
  });
};

const createSubject = (subjectData) => {
  // console.log("payload submitted==>", studentData);
  return axios.post(`${localBaseUrl}subjects`, subjectData, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      token,
    },
  });
};

const createScore = (scorePayload) => {
  return axios.post(`${localBaseUrl}/scores`, scorePayload, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      token,
    },
  });
};

const fetchAllStudents = ({ queryKey }) => {
  const filter = queryKey[1];
  // console.log("the filter given to query==>", filter);
  if (filter) {
    return axios.get(
      `${localBaseUrl}students?school=${filter?.school_id}&grade=${filter?.grade_id}`
    );
  }
  // else if(filter?.filteredFields?.character == "students"){
  //     return axios.get(`${localBaseUrl}students?school=${filter?.schoolId}`)
  // }
};

const fetchAllClasses = async ({ queryKey }) => {
  const filter = queryKey[1];
  // console.log("schoolid supplied for classes=>", filter);
  const classes = await axios.get(`${localBaseUrl}grades/${filter}`);
  return {
    data: classes?.data?.code == 600 ? classes?.data?.msg : classes?.data,
  };
};

const fetchSingleStudent = ({ queryKey }) => {
  const student_id = queryKey[1];
  return axios.get(`${localBaseUrl}students/${student_id}/info`);
};

const fetchStudentAcademicRecords = async ({ queryKey }) => {
  const { session, term, subject, student_id } = queryKey[1];

  const query =
    typeof subject !== "string" || subject.trim().length < 1
      ? {
          session,
          term,
          student_id,
        }
      : {
          session,
          subject,
          term,
          student_id,
        };

  const filteredRes = await axios.get(`${localBaseUrl}/scores/aggregate`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      token,
    },
    params: query,
  });
  return {
    data:
      filteredRes?.data?.data?.code === 600
        ? filteredRes?.data?.data?.data
        : filteredRes?.data?.data,
  };
};

export const useAllStudentsData = (filter) => {
  return useQuery(
    ["students", filter],
    fetchAllStudents,
    // () => {
    //   // return axios.get(`${baseUrl}students`)
    // },
    {
      initialData: () => {},
      enabled: !!filter, //enable query only if filter is avalable
      staleTime: 120000,
    }
  );
};

const userLogin = (payload) => {
  return axios.post(`${localBaseUrl}auth/login`, payload);
};

export const useUserLogin = () => {
  return useMutation(userLogin, {
    onSuccess: (data) => {
      // const token = Cookies.get('token');
      // console.log('the token is', token)
      // const user = jwt(token);
      console.log("response from login=>", data);
      // Cookies.set('access_token',data?.data?.msg?.accessToken,{} )
    },
    onError: (error) => {
      console.log("error was returned from login", error);
    },
  });
};

export const useSingleStudentData = (student_id) => {
  return useQuery(["studentInView", student_id], fetchSingleStudent, {
    onSuccess: (data) => {
      console.log("student in view", data);
    },
    enabled: !!student_id, //enable query only if studentId is avalable
    staleTime: 120000,
  });
};

export const useStudentAcademicData = (studentRecordQuery) => {
  return useQuery(
    ["studentScores", studentRecordQuery],
    fetchStudentAcademicRecords,
    {
      enabled: !!studentRecordQuery?.term,
      staleTime: 120000,
    }
  );
};

export const useAllSchoolsData = () => {
  const queryClient = useQueryClient();
  return useQuery(
    "schools",
    () => {
      return axios.get(`${localBaseUrl}schools`);
    },
    {
      initialDataUpdatedAt: () => {
        // get the last time the schools data was fetched so that staleTime would be accurate
        queryClient.getQueryState("schools")?.dataUpdatedAt;
      },
      staleTime: 120000, //refetch after 2 minutes
    }
  );
};

export const useAllTrainersData = () => {
  return useQuery(
    "trainers",
    () => {
      return axios.get(`${localBaseUrl}trainers`);
    },
    {
      // enabled:!!studentId,
      staleTime: 120000, //refetch after 2 minutes
    }
  );
};


export const useAllSubjectsData = (schoolId) => {
  return useQuery(
    ["subjects", schoolId],
    async () => {
      // console.log("fetching subjects for this sch=>", schoolId)
      const subj = await axios.get(`${localBaseUrl}subjects/all/${schoolId}`);
      // console.log("fetched=>", subj)
      return {
        data: subj?.data?.code === 600 ? subj?.data?.msg : subj?.data,
      };
    },
    {
      enabled:!!schoolId,
      staleTime: 300000, //refetch after 5 minutes
    }
  );
};

export const useOneSubjectData = (subjectId) => {
  const queryClient = useQueryClient();
  return useQuery(
    ["thisSubject", subjectId],
    async () => {
      const getSubject = await axios.get(
        `${localBaseUrl}subjects/${subjectId}`
      );
      return {
        data:
          getSubject?.data?.data?.code === 600 && getSubject?.data?.data?.data
            ? getSubject?.data?.data?.data
            : getSubject?.data?.data,
      };
    },
    {
      initialData: () => {
        const allSubj = queryClient.getQueryData(["subjects"]);
        const foundSubj = allSubj?.data?.mg?.find(
          (subj) => subj?.subject_id === subjectId
        );
        if (foundSubj) {
          return {
            data: foundSubj,
          };
        } else {
          return undefined;
        }
      },
      staleTime: 300000, //refetch after 5 minutes
    }
  );
};

export const useAllClassesData = (schoolId) => {
  const queryClient = useQueryClient();
  return useQuery(["classes", schoolId], fetchAllClasses, {
    initialDataUpdatedAt: () => {
      queryClient.getQueryState(["classes", schoolId])?.dataUpdatedAt;
    },
    enabled: !!schoolId,
    staleTime: 120000, //refetch after 2 minutes
  });
};

export const useCreateSchoolData = () => {
  const queryClient = useQueryClient();
  return useMutation(createSchool, {
    onSuccess: () => {
      queryClient.invalidateQueries("schools");
    },
  });
};

export const useCreateClassData = () => {
  const queryClient = useQueryClient();
  return useMutation(createClass, {
    onSuccess: () => {
      // console.log("success creating class!!!")
      queryClient.invalidateQueries("classes");
    },
    onError: (err) => {
      console.log("error while creating class", err);
    },
  });
};

export const useCreateStudentData = () => {
  const queryClient = useQueryClient();
  return useMutation(createStudent, {
    onSuccess: (data) => {
      // console.log("success creating student!!!", data);
      queryClient.invalidateQueries([
        "students",
        {
          school_id: data?.data?.msg?.school_id,
          grade_id: data?.data?.msg?.grade,
        },
      ]);
    },
    onError: (err) => {
      console.log("error while creating student", err);
    },
  });
};

export const useCreateSubjectData = () => {
  const queryClient = useQueryClient();
  return useMutation(createSubject, {
    onSuccess: (data) => {
      // console.log("success creating student!!!", data);
      queryClient.invalidateQueries(["subjects",data?.data?.msg?.school]);
    },
    onError: (err) => {
      console.log("error while creating student", err);
    },
  });
};

export const useCreateScoreData = (filteredSubject) => {
  const queryClient = useQueryClient();
  return useMutation(createScore, {
    onSuccess: (data) => {
      const filter = !filteredSubject
        ? {
            session: data?.data?.msg?.session_id,
            term: data?.data?.msg?.term,
            student_id: data?.data?.msg?.student_id,
          }
        : {
            session: data?.data?.msg?.session_id,
            subject: filteredSubject,
            term: data?.data?.msg?.term,
            student_id: data?.data?.msg?.student_id,
          };

      queryClient.invalidateQueries(["studentScores", filter]);
    },
    onError: (err) => {
      console.log("error while creating student", err);
    },
  });
};

export const useSchoolInview = (schoolId) => {
  const queryClient = useQueryClient();
  return useQuery(
    ["school", schoolId],
    async () => {
      // console.log("====we could not get initial data====")
      const sch = await axios.get(`${localBaseUrl}schools/${schoolId}`);
      return { data: sch?.data?.code == 600 ? sch?.data?.msg : sch?.data };
    },
    {
      initialData: () => {
        // console.log("the schools=>", queryClient.getQueryData('schools')?.data)
        const allSchools = queryClient.getQueryData(["schools"])?.data?.msg;
        const schoolInview = allSchools?.find(
          (sch) => sch?.school_id === schoolId
        );
        if (schoolInview) {
          // console.log("the school gan gan=>", schoolInview);
          return {
            data: schoolInview,
          };
        } else {
          return undefined;
        }
      },
      initialDataUpdatedAt: () => {
        queryClient.getQueryState("schools")?.dataUpdatedAt;
      },
      enabled: !!schoolId,
      staleTime: 300000, //refetch after 5 minutes
    }
  );
};

export const useClassInview = ({ classId, schoolId }) => {
  // console.log("the filter ==>", classId, schoolId)
  const queryClient = useQueryClient();
  // console.log("=====>",queryClient.getQueryData(['classes', schoolId])?.data);
  return useQuery(
    ["class", classId],
    async () => {
      const clas = await axios.get(`${localBaseUrl}grades/${classId}/details`);
      return { data: clas?.data?.code == 600 ? clas?.data?.msg : clas?.data };
    },
    {
      initialData: () => {
        const schoolInview = queryClient.getQueryData([
          "school",
          schoolId,
        ])?.data;
        const classInview = queryClient
          .getQueryData(["classes", schoolId])
          ?.data?.find((cls) => cls?.grade_id == classId);

        if (
          schoolInview &&
          classInview &&
          schoolInview?.school_id === classInview?.school_id
        ) {
          return { data: classInview };
        } else {
          return undefined;
        }
      },
      initialDataUpdatedAt: () => {
        queryClient.getQueryState(["classes", schoolId])?.dataUpdatedAt;
      },
      enabled: !!classId && !!schoolId,
      staleTime: 240000, //refetch after 4 minutes
    }
  );
};

export const useAllSessionsData = () => {
  const queryClient = useQueryClient();
  return useQuery(
    ["sessions"],
    async () => {
      const allSessions = await axios.get(`${localBaseUrl}/sessions`);
      return {
        data:
          allSessions?.data?.code === 600
            ? allSessions?.data?.msg
            : allSessions?.data,
      };
    },
    {
      // onSuccess:(data)=>{
      //   console.log("all classes returned==>",data)
      // },
      initialDataUpdatedAt: () => {
        queryClient.getQueryState(["sessions"])?.dataUpdatedAt;
      },
      // enabled: !!schoolId,
      staleTime: 120000, //refetch after 2 minutes
    }
  );
};

export const useClassData = ({ classId, schoolId }) => {
  const queryClient = useQueryClient();
  return useQuery(
    ["thisClass", classId],
    async () => {
      const clas = await axios.get(`${localBaseUrl}grades/${classId}/details`);
      return { data: clas?.data?.code == 600 ? clas?.data?.msg : clas?.data };
    },
    {
      initialData: () => {
        const allClasses = queryClient.getQueryData(["classes", schoolId]);
        const thisClass = allClasses?.data?.data?.msg?.find((clas) =>
          clas?.class_id === classId ? clas : null
        );
        if (thisClass) {
          return {
            data: thisClass,
          };
        } else {
          return undefined;
        }
      },
      initialDataUpdatedAt: () => {
        queryClient.getQueryState(["classes", schoolId])?.dataUpdatedAt;
      },
      enabled: !!classId && !!schoolId,
      staleTime: 240000, //refetch after 4 minutes
    }
  );
};
