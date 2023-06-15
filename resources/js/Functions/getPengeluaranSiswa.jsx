import axios from "axios"

const getPengeluaranSiswa = async (nis, tanggal) => {
    try {
        const response = await axios.post(
            route('get-pengeluaran-siswa',
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

export default getPengeluaranSiswa