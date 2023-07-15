import axios from "axios"

const getAllSiswaKeluar = async (tahun) => {
    try {
        const response = await axios.post(
            route('get-all-siswa-keluar', { tahun })
        )
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getAllSiswaKeluar