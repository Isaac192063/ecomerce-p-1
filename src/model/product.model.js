import PgConection from "../service/PgConection.service.js";

export const getAllProductModel = async (limit, offset) => {
    const pgp = new PgConection();
    return pgp.conection.query(
        `
        SELECT 
            *
        FROM
            PRODUCTS
        ORDER BY 
            id_product
        LIMIT $1
        OFFSET $2

        `,
        [limit, offset]
    );
};

export const getProductByIdModel = async (id) => {
    const pgp = new PgConection();
    return pgp.conection.oneOrNone(
        `
        SELECT 
            *
        FROM
            PRODUCTS
        WHERE
            id_product = $1
        `,
        [id]
    );
};

export const saveProductModel = async (name, price, image, description, id_cty) => {
    const pgp = new PgConection();
    return pgp.conection.query(
        `
        INSERT INTO PRODUCTS(
            name, 
            price, 
            image, 
            description,
            id_cty
            )
        VALUES(
            $[name],
            $[price],
            $[image],
            $[description],
            $[id_cty]
            )
        RETURNING
            *
        `,
        {
            name,
            price,
            description,
            image,
            id_cty,
        }
    );
};

export const deleteProductModel = async (idProduct) => {
    const pg = new PgConection();

    return pg.conection.query(
        `
        DELETE
        FROM
            PRODUCTS
        WHERE
            id_product = $1
        RETURNING 
            *
        `,
        [idProduct]
    );
};

export const updateProductModel = async (name, description, price, idProduct, image) => {
    const pg = new PgConection();
    return pg.conection.oneOrNone(
        `
        UPDATE
            PRODUCTS
        SET
            name = $[name],
            description = $[description],
            price = $[price],
            image = $[image]
        WHERE 
            id_product = $[idProduct]
        RETURNING 
            *
        `,
        {
            name,
            description,
            price,
            image,
            idProduct,
        }
    );
};

export const countProductModel = async () => {
    const pg = new PgConection();
    return pg.conection.oneOrNone(`
        SELECT
            COUNT(*)
        FROM 
            PRODUCTS
    `);
};

export const deleteProductForCategoryModel = async (idCategory) => {
    const pg = new PgConection();
    return pg.conection.query(
        `
        UPDATE PRODUCTS
        SET 
            status = false
        WHERE 
            id_cty = $1 
    `,
        [idCategory]
    );
};
