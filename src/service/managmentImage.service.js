import fs from "fs";
import environment from '../config/environments.config.js'

export const saveImage = (image, prefix) => {
    try {
        const mimeType = image.match(/^data:(image\/\w+);base64,/);
        const extension = mimeType[1].split("/")[1];

        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        const nameImage = `${prefix}_${Date.now()}.${extension}`;

        fs.writeFile(`./src/public/img/${nameImage}`, buffer, (err) => {
            if (err) {
                console.log("Error al guardar la imagen");
            }
        });

        return `http://${environment.HOST}:${environment.PORT}/img/${nameImage}`;
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
