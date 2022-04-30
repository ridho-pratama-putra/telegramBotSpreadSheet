const SPREAD_SHEET_ID = "1cpsvve6LQnrVj1_HqaWSmxF7C9CirUTeSv2EGtQ93iU";
const SHEET_NAME = "data";
const FORMAT_HINT = "Format yang tersedia : \n1. Format Layanan Fallout Data = /moban FD-(Nama STO)-(Nama Datel)>(NomorSC) Fallout (UIM) (Keterangan Provisioning Failed) \n2. Format Layanan Development = /moban DEV-(Nama STO)-(Nama Datel)>(Nama ODP) (Nomor Port) \n3. Format Layanan Occupancy = /moban OCC-(Nama STO)-(Nama Datel)>(Nama ODP) (Keterangan) \n4. Format Layanan Service = /moban SVC-(Nama STO)-(Nama Datel)>(Nomor SC) (Keterangan)";
const LAYANAN_HINT = "Layanan yang tersedia : \n1. FD = Fallout Data \n2. SVC = Service/Pelurusan \n3. DEV = Development/Tampilkan ODP \n4. OCC = Occupancy dan tampilkan user ODP";
const MENU_HINT = "Menu yang tersedia : \n1. /layanan = Jenis Layanan \n2. /format = Format yang Tersedia \n3. /moban = Work Order \n4. /cek = cek hasil ticket id";
const WRONG_FORMAT_HINT = "perintah salah rekan! gunakan /format untuk mengetahui perintah sesuai";
const WELCOME_HINT = "selamat datang di DAMAN Witel Purwokerto Rekan. silahkan input perintah sesuai /format";
const DATELS = ['PWT','CLC','BBT','BJR','PBG', 'GML'];
const STOS = ['AJB', 'BBT', 'BJR', 'BRD', 'BYM', 'CLC', 'CLO', 'GML', 'KLP', 'KRY', 'MAN', 'MAO', 'PBG', 'PWT', 'SDJ', 'SUK'];
const LAYANAN_AVAILABLE = ['FD', 'DEV', 'SVC', 'OCC'];