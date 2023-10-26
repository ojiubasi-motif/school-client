/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const TermResult = (props) => {
  const { student, grade, session, term, result, allSubjects } = props;

  return (
    <div className="mb-5">
      <div className="row row-cols-2 border border-info rounded">
        <span className="d-flex">
          Student:{" "}
          <p className="m-0 p-0 fw-bold ms-1 text-capitalize text-secondary fst-italic">{`${student?.first_name} ${student?.last_name}`}</p>
        </span>
        <span className="d-flex">
          Session:{" "}
          <p className="m-0 p-0 fw-bold ms-1 text-secondary fst-italic">
            {session?.title}
          </p>
        </span>
        <span className="d-flex">
          Class:{" "}
          <p className="m-0 p-0 fw-bold ms-1 text-secondary fst-italic">
            {grade}
          </p>
        </span>
        <span className="d-flex">
          Arm:{" "}
          <p className="m-0 p-0 fw-bold ms-1 text-secondary fst-italic">
            {student?.arm}
          </p>
        </span>
        <span className="d-flex">
          Term:{" "}
          <p className="m-0 p-0 fw-bold ms-1 text-secondary fst-italic">
            {term}
          </p>
        </span>
      </div>
      {/* =======table======== */}
      <table className="table table-sm table-striped mt-2">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">Subject</th>
            <th scope="col">Assesments</th>
            <th scope="col">Examination</th>
            <th scope="col">total</th>
          </tr>
        </thead>
        <tbody>
          {result?.length > 0 ? (
            result?.map((selected, index) =>
              term == 1 && typeof selected?.record?.first_term !== "string" ? (
                <tr key={index}>
                  {/* <th scope="row">1</th> */}
                  <td>
                    {
                      allSubjects?.find(
                        (subj) => subj?.subject_id === selected?.subject
                      )?.title
                    }
                  </td>
                  <td className="d-flex">
                    {selected?.record?.first_term?.map((score, index) =>
                      score?.assessment_type != "Examination" ? (
                        <p
                          className="m-0 p-0 me-2 px-1 border border-secondary rounded"
                          key={index}
                        >
                          {score?.score}
                        </p>
                      ) : null
                    )}
                  </td>
                  <td>
                    {
                      selected?.record?.first_term?.find(
                        (score) => score?.assessment_type == "Examination"
                      )?.score
                    }
                  </td>
                  <td>{selected?.aggr?.first_term_total}</td>
                </tr>
              ) : term == 2 &&
                typeof selected?.record?.second_term !== "string" ? (
                <tr key={index}>
                  {/* <th scope="row">1</th> */}
                  <td>
                    {
                      allSubjects?.find(
                        (subj) => subj?.subject_id === selected?.subject
                      )?.title
                    }
                  </td>
                  <td className="d-flex">
                    {selected?.record?.second_term?.map((score, index) =>
                      score?.assessment_type != "Examination" ? (
                        <p
                          className="m-0 p-0 me-2 px-1 border border-secondary rounded"
                          key={index}
                        >
                          {score?.score}
                        </p>
                      ) : null
                    )}
                  </td>
                  <td>
                    {
                      selected?.record?.second_term?.find(
                        (score) => score?.assessment_type == "Examination"
                      )?.score
                    }
                  </td>
                  <td>{selected?.aggr?.second_term_total}</td>
                </tr>
              ) : term == 3 &&
                typeof selected?.record?.third_term !== "string" ? (
                <tr key={index}>
                  {/* <th scope="row">1</th> */}
                  <td>
                    {
                      allSubjects?.find(
                        (subj) => subj?.subject_id === selected?.subject
                      )?.title
                    }
                  </td>
                  <td className="d-flex">
                    {selected?.record?.third_term.map((score, index) =>
                      score?.assessment_type != "Examination" ? (
                        <p
                          className="m-0 p-0 me-2 px-1 border border-secondary rounded"
                          key={index}
                        >
                          {score?.score}
                        </p>
                      ) : null
                    )}
                  </td>
                  <td>
                    {
                      selected?.record?.third_term?.find(
                        (score) => score?.assessment_type == "Examination"
                      )?.score
                    }
                  </td>
                  <td>{selected?.aggr?.third_term_total}</td>
                </tr>
              ) : null
            )
          ) : (
            <h5 className="text-warning">No record found</h5>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TermResult;