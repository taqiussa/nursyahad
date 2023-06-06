import axios from "axios"

const getPemasukanTahunan = async (tahun) => {
    try {
        const response = await axios.post(
            route('get-pemasukan-tahunan',
                {
                    tahun: tahun,
                })
        )
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getPemasukanTahunan