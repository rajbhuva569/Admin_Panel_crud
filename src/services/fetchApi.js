export const fetchApi = async () => {

    const response = await fetch('https://student-api.mycodelibraries.com/api/user/get')
    const json = await response.json()
    console.log(json);
    return json
};
export const fetchStudentApi = async () => {

    const response = await fetch('https://student-api.mycodelibraries.com/api/student/get')
    const json = await response.json()
    console.log(json);
    return json
};
export const fetchProdcutApi = async () => {

    const response = await fetch('https://student-api.mycodelibraries.com/api/product/get')
    const json = await response.json()
    console.log(json);
    return json
};

