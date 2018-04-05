import mandatory from "./mandatory";

const deepclone = (obj = mandatory("Object")) =>
    JSON.parse(JSON.stringify(obj));

export default deepclone;