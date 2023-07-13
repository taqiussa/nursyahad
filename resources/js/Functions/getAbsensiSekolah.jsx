import axios from "axios"

const getAbsensiSekolah = async (tanggal, tahun, jam, kelasId) => {
    try {
        const response = await axios.post(
            route('get-absensi-sekolah',
                {
                    tanggal,
                    tahun,
                    jam,
                    kelasId
                })
        )
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getAbsensiSekolah