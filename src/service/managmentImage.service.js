import fs from "fs";
import environment from "../config/environments.config.js";
import { v4 as uuidv4 } from 'uuid';

export const saveImage = (image, prefix) => {
    try {
        if (prefix === "product") {
            const images = [];
            for (let i = 0; i < image.length; i++) {
                const element = image[i];
                images.push(configImage(element, prefix));
            }
            return images;
        }

        return configImage(image, prefix);

    } catch (error) {
        console.log(error);
        return "";
    }
};

export const updateImage = (image, currentImage, prefix) => {
    deleteImage(image);
    const nameSaveImage = saveImage(currentImage, prefix);
    return nameSaveImage;
};

export const deleteImage = (image) => {
    const nameImage = image ? image.split("img/")[1] : null;

    const pathImagePrevius = `./src/public/img/${nameImage}`;

    if (fs.existsSync(pathImagePrevius)) {
        fs.unlink(pathImagePrevius, (err) => {
            if (err) {
                console.log("Ocurrio un error al eliminar la imagen");
            }
        });
    }
};

function configImage(image, prefix) {
    const mimeType = image.match(/^data:(image\/\w+);base64,/);
    const extension = mimeType[1].split("/")[1];

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const nameImage = uuidv4();

    fs.writeFile(`./src/public/img/${nameImage}`, buffer, (err) => {
        if (err) {
            console.log("Error al guardar la imagen");
        }
    });

    return `http://ecomerce-p-1.onrender.com/img/${nameImage}`;
}
