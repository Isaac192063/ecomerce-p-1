import PgConection from "./../service/PgConection.service.js";
import pgConection from "./../service/PgConection.service.js";

export const newUserModel = async (user) => {
    const pg = new pgConection();
    return pg.conection.oneOrNone(
        `
    INSERT INTO
        USERS(
            name,
            lastname,
            birthdate,
            username,
            password,
            email,
            image,
            role
        )
    VALUES (
            $[name],
            $[lastname], 
            $[birthdate], 
            $[username], 
            $[password], 
            $[email], 
            $[image],
            $[role] 
    )
    RETURNING 
        *
    `,
        {
            name: user.name,
            lastname: user.lastname,
            password: user.password,
            username: user.username,
            birthdate: user.birthdate,
            email: user.email,
            image: user.image,
            role: user.role,
        }
    );
};

export const getAllUsersModel = async () => {
    const pg = new PgConection();
    return pg.conection.manyOrNone(`
        SELECT 
            *
        FROM 
            USERS
        ORDER BY
            id_user
        `);
};

export const updateUserModel = async (name, lastname, username, password, email, image, idUser) => {
    const pg = new PgConection();
    return pg.conection.oneOrNone(
        `
        UPDATE USERS
        SET
            name = $[name],
            lastname = $[lastname],
            username = $[username],
            password = $[password],
            email = $[email],
            image = $[image]
        WHERE 
            id_user = $[idUser]
        RETURNING
            *
        `,
        {
            name,
            lastname,
            username,
            password,
            email,
            image,
            idUser,
        }
    );
};

export const getUserByIdModel = async (idUser) => {
    const pg = new PgConection();
    return pg.conection.oneOrNone(
        `
        SELECT 
            *
        FROM
            USERS
        WHERE 
            id_user = $1 
    `,
        [idUser]
    );
};

export const ifExistUsernameOrEmail = (email, username) => {
    const pg = new PgConection();
    return pg.conection.oneOrNone(
        `
    SELECT 
        id_user
    FROM 
        USERS
    WHERE 
        email = $1
        OR username = $2
    `,
        [email, username]
    );
};

export const ifExistUsernameOrEmailUpdate = (email, username, idUser) => {
    const pg = new PgConection();
    return pg.conection.oneOrNone(
        `
    SELECT 
        id_user
    FROM 
        USERS
    WHERE 
        (email = $1
        OR username = $2)
        AND id_user <> $3
    `,
        [email, username, idUser]
    );
};

export const deleteUserModel = async (idUser) => {
    const pg = new PgConection();
    return pg.conection.oneOrNone(
        `
    DELETE FROM
        USERS
    WHERE 
        id_user = $1 
    RETURNING 
        *
    `,
        [idUser]
    );
};

export const authenticationModel = async(email, username) =>{
    const pg = new PgConection();
    return pg.conection.oneOrNone(`
    SELECT
        *
    FROM 
        USERS
    WHERE
        (email = $1
        OR username = $2)
    `, [email, username]);
}