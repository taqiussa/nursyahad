import axios from "axios"

const getKecamatan = async (kabupaten) => {
    try {
        const response = await axios.post(
            route('get-kecamatan',
                {
                    kabupaten: kabupaten
                })
        )
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getKecamatan