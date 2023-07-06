import axios from "axios"

const getWajibBayarSekolah = async (tahun) => {
    try {
        const response = await axios.post(
            route('get-wajib-bayar-sekolah',
                {
                    tahun
                })
        )
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getWajibBayarSekolah