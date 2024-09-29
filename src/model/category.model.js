import PgConection from "../service/PgConection.service.js";

export const getCategoryByIdModel = async (id) => {
    const pgp = new PgConection();
    return pgp.conection.oneOrNone(
        `
        SELECT 
            *
        FROM 
            CATEGORIES
        WHERE 
            id_category = $1
        `,
        [id]
    );
};

export const getAllCategoryModel = async () => {
    const pg = new PgConection();
    return pg.conection.manyOrNone(
        `
        SELECT
        *
        FROM
        CATEGORIES
        
        `
    );
};

export const newCategoryModel = async (name, description) => {
    const pg = new PgConection();
    return pg.conection.oneOrNone(
        `
        INSERT INTO CATEGORIES(
            name, 
            description
        )
        VALUES 
            ($1, $2)
        RETURNING
            *
        `,
        [name, description]
    );
};

export const updateCategoryModel = async (name, description, idCategory) => {
    const pg = new PgConection();
    return pg.conection.oneOrNone(
        `
        UPDATE CATEGORIES
        SET
            name = $1,
            description = $2
        WHERE 
            id_category = $3
        RETURNING
            *
    `,
        [name, description, idCategory]
    );
};

export const getProductByCategoryModel = async (idProduct) =>{
    const pg = new PgConection()
    return pg.conection.manyOrNone(`
        SELECT 
            P.*
        FROM 
            PRODUCTS P
        LEFT JOIN 
            CATEGORIES C
        ON 
            C.id_category = P.id_cty
        WHERE 
            P.id_cty = $1
    `, [idProduct]);
}

export const deleteCategoryModel = async (idCategory) =>{
    const pg = new PgConection();
    return pg.conection.oneOrNone(`
        UPDATE CATEGORIES
        SET 
            status = false
        WHERE 
            id_category = $1
        RETURNING
            *
        `, [idCategory])
}