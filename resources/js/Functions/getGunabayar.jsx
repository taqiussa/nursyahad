import axios from "axios"

const getGunabayar = async (tahun, gunabayarId, kategori) => {
    try {
        const response = await axios.post(
            route('get-gunabayar',
                {
                    tahun,
                    gunabayarId,
                    kategori
                })
        )
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getGunabayar