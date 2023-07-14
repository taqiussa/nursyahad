<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [
            [
                'name' => 'Abdullah Al Fayed',
                'nis' => '220065SASI'
            ],
            [
                'name' => 'Adam Arsenio',
                'nis' => '220066PKSI'
            ],
            [
                'name' => 'Adiba Kayyasa Nabiha',
                'nis' => '220067MATE'
            ],
            [
                'name' => 'Ahmad Amri Mubarok',
                'nis' => '220068PKSE'
            ],
            [
                'name' => 'Ahmad Dinejav',
                'nis' => '220069MAII'
            ],
            [
                'name' => 'Aisyah Choirun Najjiya',
                'nis' => '220070MATI'
            ],
            [
                'name' => 'Akyas Mahfudz Muhammad',
                'nis' => '220071SAFE'
            ],
            [
                'name' => 'Aldo Abinaya Alexi',
                'nis' => '220072SAIE'
            ],
            [
                'name' => 'Ammar Syaqib Al Arkhan',
                'nis' => '220073KAIE'
            ],
            [
                'name' => 'Anggita Nur Maulida',
                'nis' => '220074PASI'
            ],
            [
                'name' => 'Azkayra Rukma Qotrunnanda Falah',
                'nis' => '220075KKIE'
            ],
            [
                'name' => 'Dhea Salma Maulidya',
                'nis' => '220076MAIE'
            ],
            [
                'name' => 'Gibran Ahmad El Ghazi',
                'nis' => '220077SAFI'
            ],
            [
                'name' => 'Isna Arrifa Musta',
                'nis' => '220078PATI'
            ],
            [
                'name' => 'Jessica Ayu Azalia',
                'nis' => '220079MATE'
            ],
            [
                'name' => 'Nabila Aulia Zahra',
                'nis' => '220080SASE'
            ],
            [
                'name' => 'Nadhera Ayeesa Amira',
                'nis' => '220081SAFE'
            ],
            [
                'name' => 'Rafif Agastya Pramadana',
                'nis' => '220082PVTE'
            ],
            [
                'name' => 'Rizki Muhammad Affan',
                'nis' => '220083PAFE'
            ],
            [
                'name' => 'Danish Muhammad Wiratama',
                'nis' => '210050KATE'
            ],
            [
                'name' => 'Dzakiyatussyarifah',
                'nis' => '210051PKSI'
            ],
            [
                'name' => 'Ghulam Muhammad Hadziq',
                'nis' => '210053KATE'
            ],
            [
                'name' => 'Hafiza Khaira Lubna',
                'nis' => '210054KATE'
            ],
            [
                'name' => 'Ika Nur Rofiah',
                'nis' => '220085MAFI'
            ],
            [
                'name' => 'Latifatus Sadiyah',
                'nis' => '210055SKIE'
            ],
            [
                'name' => 'Muhammad Albi Haddad Hidayat',
                'nis' => '220084PAFE'
            ],
            [
                'name' => 'Muhammad Al Chafy',
                'nis' => '210057MAIE'
            ],
            [
                'name' => 'Muhammad Ibnu Alfin Mubarok',
                'nis' => '210058MAFE'
            ],
            [
                'name' => 'Muhammad Vino Bastian',
                'nis' => '210056SASE'
            ],
            [
                'name' => 'Muhammad Wigar Tulus Sambodo',
                'nis' => '210059PAFI'
            ],
            [
                'name' => 'Nadia Sabikhatul Khasanah',
                'nis' => '210060MASE'
            ],
            [
                'name' => 'Naila Bilqis Muazara',
                'nis' => '210061SATE'
            ],
            [
                'name' => 'Nuria Alya Syakira',
                'nis' => '210062MVSI'
            ],
            [
                'name' => 'Alfin Ma\'ruf Alfaruq',
                'nis' => '220086MAII'
            ],
            [
                'name' => 'Almira Farras Divana Permadi',
                'nis' => '200022SASI'
            ],
            [
                'name' => 'Channah Aisyah',
                'nis' => '200024KATE'
            ],
            [
                'name' => 'Dzawata Afnan Alfaiza',
                'nis' => '200026KAIE'
            ],
            [
                'name' => 'Elshafira Khoirul Hafiza',
                'nis' => '200027MAII'
            ],
            [
                'name' => 'Erika Khansa Salsabila',
                'nis' => '200028MAFI'
            ],
            [
                'name' => 'Falihatunnafisa',
                'nis' => '200029MATE'
            ],
            [
                'name' => 'Lidya Alya Faiqa',
                'nis' => '200032SVFI'
            ],
            [
                'name' => 'M. Abie Sakhi Zaidhan',
                'nis' => '200033MAFI'
            ],
            [
                'name' => 'M. Ali Wafa Abasalama',
                'nis' => '200034SATE'
            ],
            [
                'name' => 'M. Darul Firdaus Ar Rafid',
                'nis' => '200035PAIE'
            ],
            [
                'name' => 'M. Nufail Fadhla',
                'nis' => '200038KAII'
            ],
            [
                'name' => 'M. Raffa Al Wizar',
                'nis' => '200039MASE'
            ],
            [
                'name' => 'Nadifa Khanza Azahra',
                'nis' => '220087SASE'
            ],
            [
                'name' => 'Rafa Setya Aprilia',
                'nis' => '200042MAIE'
            ],
            [
                'name' => 'Talitha Fatimah Azzahra',
                'nis' => '200045PAIE'
            ],
            [
                'name' => 'Zahira Lutfia Fitri Azzahra',
                'nis' => '200044PAIE'
            ],
            [
                'name' => 'Dzakira Talita Zahra',
                'nis' => '200025SAFE'
            ],
            [
                'name' => 'Muhammad Miftahul Ulum',
                'nis' => '200040PVTI'
            ],
            [
                'name' => 'Aeklima Khairunnisa Putri',
                'nis' => '190011SAIE'
            ],
            [
                'name' => 'Agha Zahir Al Shirazi',
                'nis' => '200046SAII'
            ],
            [
                'name' => 'Alex Iskandar Zulkarnaen',
                'nis' => '180002KKTE'
            ],
            [
                'name' => 'Alfaya Nurun Najah',
                'nis' => '190012SASI'
            ],
            [
                'name' => 'Asha Kinara Dewi',
                'nis' => '190013PVSE'
            ],
            [
                'name' => 'Azzahra Naila Rahma',
                'nis' => '190014PAFI'
            ],
            [
                'name' => 'Bachtiar Maulana Agfi',
                'nis' => '190015SATE'
            ],
            [
                'name' => 'Dima Rizkiyana Novia Anwar',
                'nis' => '190021SAIE'
            ],
            [
                'name' => 'Hasnau Sofia Salsabila',
                'nis' => '190016MVIE'
            ],
            [
                'name' => 'Nadinda Hasya Fadaina',
                'nis' => '220088PVFI'
            ],
            [
                'name' => 'Nandito Pratikman Putra',
                'nis' => '190019PAIE'
            ],
            [
                'name' => 'Ravangga Yamdee',
                'nis' => '190020SKFE'
            ],
            [
                'name' => 'Rihla Medina Mecca',
                'nis' => '200043MATE'
            ],
            [
                'name' => 'Eza Rifky Akbar',
                'nis' => '210063PAII'
            ],
            [
                'name' => 'Ganesia Restu Huda',
                'nis' => '180003PKIn'
            ],
            [
                'name' => 'M. Habib Hasyim Husaini',
                'nis' => '180005KKSE'
            ],
            [
                'name' => 'Maslahatul Ummah',
                'nis' => '180004MVII'
            ],
            [
                'name' => 'Muhammad Arkaan Lathif Ibnu Nabil',
                'nis' => '190018MVFE'
            ],
            [
                'name' => 'Muhammad Rizqi Maulana',
                'nis' => '180006PAII'
            ],
            [
                'name' => 'Nanda Naira Abiyyah',
                'nis' => '180007SVIE'
            ],
            [
                'name' => 'Naylil Muna Ramadhani',
                'nis' => '180009SVIE'
            ],
            [
                'name' => 'Achmad Benyamin Alfarobi',
                'nis' => '230090KAIn'
            ],
            [
                'name' => 'Akbar Arka Syahputra',
                'nis' => '230091PKIn'
            ],
            [
                'name' => 'Alfatunnissa Aqila Permadi',
                'nis' => '230092MASE'
            ],
            [
                'name' => 'Azril Maulana Rahmadiansyah',
                'nis' => '230093PAIn'
            ],
            [
                'name' => 'Faza Muhammad Alwaqi',
                'nis' => '230094SAFI'
            ],
            [
                'name' => 'Khaifa Sahsa Salsabilla',
                'nis' => '230095SATI'
            ],
            [
                'name' => 'Khafaa Nurunnisa',
                'nis' => '230096PAFI'
            ],
            [
                'name' => 'Kiona Adema Mahveen',
                'nis' => '230097PATE'
            ],
            [
                'name' => 'Muhammad Ardani Rosyad',
                'nis' => '230098KASI'
            ],
            [
                'name' => 'Muhammad Muzakki Al Ghani',
                'nis' => '230099SAIE'
            ],
            [
                'name' => 'Muhammad Nugroho Hafidz Al Farizi',
                'nis' => '230100MATE'
            ],
            [
                'name' => 'Nahda Syauqina Azzahra',
                'nis' => '230101MAFI'
            ],
            [
                'name' => 'Myesa Arsyila Alfatunisa',
                'nis' => '230102KKSE'
            ],
            [
                'name' => 'Syafika Fitri Hadiyanto',
                'nis' => '230103PAII'
            ]
        ];

        foreach ($students as $q) {

            $user = User::create([
                'name' => $q['name'],
                'nis' => $q['nis'],
                'username' => $q['nis'],
                'password' => bcrypt('12345678')
            ]);
            $user->assignRole('Siswa');
        }
    }
}
