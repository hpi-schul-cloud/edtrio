const mandatory = (name = "arg") => {
    throw new Error(`Parameter ${name} is required`);
};

export default mandatory;