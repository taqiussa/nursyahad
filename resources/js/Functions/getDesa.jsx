import axios from "axios"

const getDesa = async (kecamatan) => {
    try {
        const response = await axios.post(
            route('get-desa',
                {
                    kecamatan: kecamatan
                })
        )
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getDesa