import axios from "axios"

const getUangSaku = async (nis, tanggal) => {
    try {
        const response = await axios.post(
            route('get-uang-saku',
                {
                    nis: nis,
                    tanggal: tanggal
                })
        )
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getUangSaku