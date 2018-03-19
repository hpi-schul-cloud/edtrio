export default const mandatory = (name = "arg") => {
    throw new Error(`Parameter ${name} is requiered`);
};