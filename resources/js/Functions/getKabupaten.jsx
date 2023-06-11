import axios from "axios"

const getKabupaten = async (provinsi) => {
    try {
        const response = await axios.post(
            route('get-kabupaten',
                {
                    provinsi: provinsi
                })
        )
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getKabupaten