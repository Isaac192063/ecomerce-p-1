import PgConection from "../service/PgConection.service.js";

export const getAllProductModelPagination = async (limit, offset) => {
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

export const getAllProductModel = async () => {
    const pgp = new PgConection();
    return pgp.conection.query(
        `
        SELECT 
            P.*, I.path AS url, I.id_pdo AS id_image
        FROM
            PRODUCTS P
        FULL OUTER JOIN 
            IMAGES I
        ON 
            P.id_product = I.id_pdo
        ORDER BY 
            id_product DESC
        `,
    );
};

export const getProductByIdModel = async (id) => {
    const pgp = new PgConection();
    return pgp.conection.manyOrNone(
        `
        SELECT 
            P.*, I.path AS url, I.id_pdo AS id_image
        FROM
            PRODUCTS P
        FULL OUTER JOIN 
            IMAGES I
        ON 
            P.id_product = I.id_pdo
        WHERE
            id_product = $1
        `,
        [id]
    );
};

export const saveProductModel = async (name, price,  description, id_cty) => {
    const pgp = new PgConection();
    return pgp.conection.oneOrNone(
        `
        INSERT INTO PRODUCTS(
            name, 
            price, 
            description,
            id_cty
            )
        VALUES(
            $[name],
            $[price],
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
            id_cty,
        }
    );
};

export const saveImageDatabase = async(images, idProduct) =>{
    console.log(images, idProduct);
    const pg = new PgConection();
    return pg.conection.oneOrNone(`
        INSERT INTO
            IMAGES
                (Path,
                id_pdo)
        VALUES 
            ($1,
            $2)
        RETURNING 
            path;
        `, [images, idProduct]);
}

export const deleteProductModel = async (idProduct, status) => {
    const pg = new PgConection();

    return pg.conection.oneOrNone(
        `
       UPDATE
            PRODUCTS
        SET
            status = $[status]
        WHERE 
            id_product = $[idProduct]
        RETURNING 
            *
        `,
        {status, idProduct }
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
            price = $[price]
        WHERE 
            id_product = $[idProduct]
        RETURNING 
            *
        `,
        {
            name,
            description,
            price,
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
