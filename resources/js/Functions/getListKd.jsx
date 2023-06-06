import axios from "axios"

const getListKd = async (tahun, semester, mataPelajaranId) => {
    try {
        const response = await axios.post(
            route('get-list-kd',
                {
                    tahun: tahun,
                    semester: semester,
                    mataPelajaranId: mataPelajaranId
                })
        )
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getListKd