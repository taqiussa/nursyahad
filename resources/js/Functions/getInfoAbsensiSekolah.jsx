import axios from "axios"

const getInfoAbsensiSekolah = async (tanggal, kelasId) => {
    try {
        const response = await axios.post(
            route('get-info-absensi-sekolah',
                {
                    tanggal,
                    kelasId
                })
        )
        return response.data;
    }
    catch (error) {
        console.log(error)
    }
}

export default getInfoAbsensiSekolah