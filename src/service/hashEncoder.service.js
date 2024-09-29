import bcriyp from "bcrypt";

export const hashPassword = async (password) => {
    const numRounds = 10;
    return await bcriyp.hash(password, numRounds);
};

export const verfiedPassword = async (password, passwordEncript) => {
    return await bcriyp.compare(password, passwordEncript);
};
