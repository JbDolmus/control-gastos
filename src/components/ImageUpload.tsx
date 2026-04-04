import { ChangeEvent, useState } from "react";
import Spinner from "./Spinner";
import { getImagePath } from "../helpers";

type ImageUploadProps = {
    image: string;
    setImage: (url: string) => void;
}

export default function ImageUpload({ image, setImage }: ImageUploadProps) {
    const preset_name = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;                         //16 Pegamos el "name" rescatado en el punto 24
    const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;                          //16.2 Pegamos el cloud_name rescatado en punto 20

    //12 Creamos estado local que guarde la url de la imagen subida
    const [loading, setLoading] = useState(false) //7 Creamos un estado local con valor incial boolean "false" para saber si la imagen esta cargando.

    const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {            //2 Preparamos para recibir el evento al ejecutarse la función async
        const files = e.target.files            //3 recuperamos el array de e.target.files
        if (!files) return                      //Add null check to ensure files is not null
        const data = new FormData()             //4 Creamos/Instanciamos un FormData objeto con nombre data
        data.append('file', files[0])           //5 Utilizando metodo append() agregamos al data el archivo desde files[0]
        data.append('upload_preset', preset_name)  //6 Como prop "upload preset" le pasamos la variable de la linea 6 (punto 16.2).

        setLoading(true)                        //8 Ponemos en true el estado local que indica que la imagen esta cargándose.

        try {
            //10 enviamos el pedido de upload con el data en body 
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });

            const file = await response.json();     //11 Traducimos la respuesta de JSON
            setImage(file.secure_url);              //13 Recuperamos la url de la imagen en estado local
            setLoading(false);                      //14 Dejamos el loading en false para que intente mostrar la magen
            //await actions.sendPhoto(file.secure_url) //15 Enviamos la url a un action para hacer algo en back. Lo dejamos bloqueado para que no de error de importacion de Context actions o de la función.
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }

    }

    return (
        <div className="flex flex-col gap-4">
            <label className="text-xl dark:text-slate-200">
                Ícono de la categoría:
            </label>

            <input
                type="file"
                accept="image/*"
                onChange={uploadImage}
                className="block w-full text-sm text-slate-600 dark:text-slate-300
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-lg file:border-0
                               file:text-sm file:font-semibold
                               file:bg-blue-50 file:text-blue-700
                               dark:file:bg-slate-700 dark:file:text-slate-200
                               hover:file:bg-blue-100
                               cursor-pointer"
            />

            {loading ?
                <Spinner />
                :
                image && (
                    <div className="flex justify-center mt-4">
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl shadow-inner">
                            <img
                                src={getImagePath(image)}
                                alt="Vista previa del ícono"
                                className="w-20 h-20 object-contain"
                            />
                        </div>
                    </div>
                )}
        </div>

    );
}
